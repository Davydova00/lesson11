import { test,expect } from "@playwright/test";

test.describe.serial("API TESTS",()=>{
    test("Testing Api 1",async ({request})=>{
        let result = await request.get("http://localhost:3000/users")
        let data = await result.json()
        expect(result.ok()).toBeTruthy()
        expect(data).toEqual(expect.arrayContaining([
            {
            id:1,
            name:"Nastya",
            age:34,
          },
          {
            id:2,
            name:"Bober",
            age:666,
          }
          ]));
    })
    
    test("Testing Api 2",async ({request})=>{
        let result = await request.get("http://localhost:3000/users/1")
        let data = await result.json()
        console.log(data)
        expect(result.ok()).toBeTruthy()
        expect(data.data).toEqual(expect.objectContaining(
            {
                id:1,
                name:"Nastya",
                age:34,
            }
        ));
    });
    test("Testing Api 3 - update",async ({request})=>{
        let result = await request.put("http://localhost:3000/user/1",{
            data:{
                name:"Suslik"
                }
        });

        let data = await result.json();
        console.log(data)
        expect(result.ok()).toBeTruthy();
    });


    test("Testing Api 4 - create user", async ({ request }) => {
        let result = await request.post("http://localhost:3000/user", {
         data : {
            id: 3,
            name: "John",
            age: 25
        }
        });
        let data;
        console.log(data);
    
        expect(result.status()).toBeTruthy();
    });


    test("Testing Api 5 - delete",async ({request})=>{
        let result = await request.delete("http://localhost:3000/users/2");
        expect(result.status()).toBeTruthy();
    });
  
})