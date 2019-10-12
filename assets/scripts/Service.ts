export default class Service {
    static SERVER_HOST: string = 'http://localhost:3004';
    static async fetch(endPoint: string): Promise<any> {
        const url: string = Service.SERVER_HOST + endPoint;
        const response: Response = await fetch(url).catch(e=>{
            throw e;
        });
        const jsonString:string = await response.text();
        return JSON.parse(jsonString);
    }
}