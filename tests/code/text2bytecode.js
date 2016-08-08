// converts the `source` in the text to bytecode
const fs = require('fs')
const opcodeMap = {
  'STOP': '00',
  'ADD': '01',
  'MUL': '02',
  'SUB': '03',
  'DIV': '04',
  'SDIV': '05',
  'MOD': '06',
  'SMOD': '07',
  'ADDMOD': '08',
  'MULMOD': '09',
  'EXP': '0a',
  'SIGNEXTEND': '0b',
  'LT': '10',
  'GT': '11',
  'SLT': '12',
  'SGT': '13',
  'EQ': '14',
  'ISZERO': '15',
  'AND': '16',
  'OR': '17',
  'XOR': '18',
  'NOT': '19',
  'BYTE': '1a',
  'SHA3': '20',
  'ADDRESS': '30',
  'BALANCE': '31',
  'ORIGIN': '32',
  'CALLER': '33',
  'CALLVALUE': '34',
  'CALLDATALOAD': '35',
  'CALLDATASIZE': '36',
  'CALLDATACOPY': '37',
  'CODESIZE': '38',
  'CODECOPY': '39',
  'GASPRICE': '3a',
  'EXTCODESIZE': '3b',
  'EXTCODECOPY': '3c',
  'BLOCKHASH': '40',
  'COINBASE': '41',
  'TIMESTAMP': '42',
  'NUMBER': '43',
  'DIFFICULTY': '44',
  'GASLIMIT': '45',
  'POP': '50',
  'MLOAD': '51',
  'MSTORE': '52',
  'MSTORE8': '53',
  'SLOAD': '54',
  'SSTORE': '55',
  'JUMP': '56',
  'JUMPI': '57',
  'PC': '58',
  'MSIZE': '59',
  'GAS': '5a',
  'JUMPDEST': '5b',
  'PUSH1': '60',
  'PUSH2': '61',
  'PUSH3': '62',
  'PUSH4': '63',
  'PUSH5': '64',
  'PUSH6': '65',
  'PUSH7': '66',
  'PUSH8': '67',
  'PUSH9': '68',
  'PUSH10': '69',
  'PUSH11': '6a',
  'PUSH12': '6b',
  'PUSH13': '6c',
  'PUSH14': '6d',
  'PUSH15': '6e',
  'PUSH16': '6f',
  'PUSH17': '70',
  'PUSH18': '71',
  'PUSH19': '72',
  'PUSH20': '73',
  'PUSH21': '74',
  'PUSH22': '75',
  'PUSH23': '76',
  'PUSH24': '77',
  'PUSH25': '78',
  'PUSH26': '79',
  'PUSH27': '7a',
  'PUSH28': '7b',
  'PUSH29': '7c',
  'PUSH30': '7d',
  'PUSH31': '7e',
  'PUSH32': '7f',
  'DUP1': '81',
  'DUP2': '82',
  'DUP3': '83',
  'DUP4': '84',
  'DUP5': '85',
  'DUP6': '86',
  'DUP7': '87',
  'DUP8': '88',
  'DUP9': '89',
  'DUP10': '8a',
  'DUP11': '8b',
  'DUP12': '8c',
  'DUP13': '8d',
  'DUP14': '8e',
  'DUP15': '8f',
  'SWAP1': '91',
  'SWAP2': '92',
  'SWAP3': '93',
  'SWAP4': '94',
  'SWAP5': '95',
  'SWAP6': '96',
  'SWAP7': '97',
  'SWAP8': '98',
  'SWAP9': '99',
  'SWAP10': '9a',
  'SWAP11': '9b',
  'SWAP12': '9c',
  'SWAP13': '9d',
  'SWAP14': '9e',
  'SWAP15': '9f',
  'LOG0': 'a1',
  'LOG1': 'a2',
  'LOG2': 'a3',
  'LOG3': 'a4',
  'CREATE': 'f0',
  'CALL': 'f1',
  'CALLCODE': 'f2',
  'RETURN': 'f3',
  'DELEGATECALL': 'f4',
  'SUICIDE': 'ff'
}

fs.readdir('.', (err, filenames) => {
  if (err) {
    console.log(err)
  }

  filenames = filenames.filter((name) => name.slice(-5) === '.json')
  filenames.forEach((filename) => {
    let byteCode = '0x'
    const tests = require(`./${filename}`)
    for (const index in tests) {
      tests[index].source.forEach((op) => {
        const opcode = opcodeMap[op]
        if (opcode) {
          byteCode += opcode
        } else {
          byteCode += op.slice(2)
        }
      })

      tests[index].code = byteCode
      fs.writeFileSync(filename, JSON.stringify(tests, null, '  '))
    }
  })
})
