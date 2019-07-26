let BITBOX = require('bitbox-sdk').BITBOX;
let bitbox = new BITBOX();



const jeton = require('jeton-lib')
const PrivateKey = jeton.PrivateKey
const Signature = jeton.Signature
const OutputScript = jeton.escrow.OutputScript
const Transaction = jeton.Transaction
const assert = require('assert')

// Create keypairs for 3 players and a referee
var priv1 = new PrivateKey("L1wChPjacPamAFVbUsZZi5cEd3kMysZSgfDGprGEj91wTP6sh7KH")
var pub1 = priv1.toPublicKey()
var priv2 = new PrivateKey("KzyhHmmxwFbv2Mo8bQsJQwXhrCgAtjsCmuqBBmGZrcjfTn1Xvzw1")
var pub2 = priv2.toPublicKey()
var priv3 = new PrivateKey("KzwmMwHjbmRRdtwVUowKpYmpnJmMaVyGTwYLmh2qmiWcqgd7W9fG")
var pub3 = priv3.toPublicKey()
 
var refPriv = new PrivateKey('L5FDo3MEb2QNs2aQJ5DVGSDE5eBzVsgZny15Ri649RjysWAeLkTs')
var refpk = refPriv.toPublicKey();
 
// Create the output script
// parties[].pubKey can be an instance of PublicKey or Address
var outputScriptData = {
    refereePubKey: refpk,
    parties: [
        {message: 'player1wins', pubKey: pub1.toAddress()},
        {message: 'player2wins', pubKey: pub2.toAddress()},
        {message: 'player3wins', pubKey: pub3.toAddress()}
    ]
}
 
let outScript = new OutputScript(outputScriptData)
console.log(outScript.toAddress().toString())
assert(outScript.toScript().toASM() === 'OP_DUP 706c617965723177696e73 OP_EQUAL OP_IF OP_DROP 706c617965723177696e73 02d180cd5d509cf23fd2139ea53634bac12d29d0a71d22ad97a59a9379faa3250a OP_CHECKDATASIGVERIFY OP_DUP OP_HASH160 44a45625a1fda976376e7d59d27fc621f9c9d382 OP_ELSE OP_DUP 706c617965723277696e73 OP_EQUAL OP_IF OP_DROP 706c617965723277696e73 02d180cd5d509cf23fd2139ea53634bac12d29d0a71d22ad97a59a9379faa3250a OP_CHECKDATASIGVERIFY OP_DUP OP_HASH160 9383fa6588a176c2592cb2f4008d779293246adb OP_ELSE OP_DUP 706c617965723377696e73 OP_EQUAL OP_IF OP_DROP 706c617965723377696e73 02d180cd5d509cf23fd2139ea53634bac12d29d0a71d22ad97a59a9379faa3250a OP_CHECKDATASIGVERIFY OP_DUP OP_HASH160 b011100d12d0537232692b3c113be5a8f5053955 OP_ENDIF OP_ENDIF OP_ENDIF OP_EQUALVERIFY OP_CHECKSIG')


var utxo = new Transaction.UnspentOutput({
    txid:
    '41f481c8ec2e1666b51323673c0727ea77e8efecf9a8a58df6d55d2a8a71b3ec',
    vout: 0,
    satoshis: 5493,
    scriptPubKey: 'a914da5056d09adf1b9b0abb281eec91fcaf7538405587'
})

var fundEscrowTx = new Transaction()
        .from(utxo)          // Feed information about what unspent outputs one can use
        .toP2SH(outScript, 5000)
        .sign([priv2])     // Signs all the inputs it can

var escrowUtxo = Transaction.utxoFromTxOutput(fundEscrowTx, 0)

// Make Transaction from escrow UTXO
var sighash = (Signature.SIGHASH_ALL | Signature.SIGHASH_FORKID)

var spendEscrowTx = new Transaction()
.from(escrowUtxo)
.to(priv1.toAddress(), 9000)

// Sign message with referee private key for player 1 wins
var refereeSig = Signature.signCDS(outputScriptData.parties[0].message, refPriv)

// Sign CDS input at index 0 as player 1
spendEscrowTx.signEscrow(0, priv1, outputScriptData.parties[0].message, refereeSig, outScript.toScript(), sighash)


  try{

    bitbox.RawTransactions.sendRawTransaction(spendEscrowTx.toString()).then(console.log)

  }catch(err){

          console.log(err)


  }
