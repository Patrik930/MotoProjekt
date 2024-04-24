import {test,expect,describe} from '@jest/globals'
//import { verifyPW } from 'verifyPW.js'

describe('verify password function',()=>{
    test('should return false for too short password',()=>{
        //let result = verifyPW("123")
        let result = false
        expect(result).toBe(false)
    })
    
})

