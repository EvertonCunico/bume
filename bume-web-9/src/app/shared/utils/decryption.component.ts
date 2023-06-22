import * as CryptoJS from 'crypto-js';

export class DecryptionComponent {

    public static decryptData(data: any): any {
        if (data && data.encrypt) {
            const encryptedText = data.encrypt;
            const decryptedText = this.decryptText(encryptedText);
            const decryptedObject = JSON.parse(decryptedText);
            return decryptedObject;
        }
        return data;
    }

    public static decryptText(encryptedText: string): string {
        const KEY = 'N^&Ea7XV5CxmcPwsrvAX_8]!gjDRDnz-';
        const encryptedBytes = CryptoJS.enc.Base64.parse(encryptedText);
        const keyBytes = CryptoJS.enc.Utf8.parse(KEY);
        const decryptedBytes = CryptoJS.AES.decrypt({ ciphertext: encryptedBytes }, keyBytes, { mode: CryptoJS.mode.ECB });
        return decryptedBytes.toString(CryptoJS.enc.Utf8);
    }

}