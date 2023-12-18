// import { describe, it } from "node:test";
// import { strictEqual } from "node:assert";
// import { baseUrl } from "./index.test.mjs";

// export default function asyncExport() {
//   describe("Contacts Workflow", () => {
//     it("Should create contact", async () => {
//       const response = await fetch(baseUrl() + "/api/v1/contacts", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ 
//           first_name: "John",
//           last_name: "Doe",
//           phone_number: "1234567890",
//         }),
//       });
//       strictEqual(response.status, 200);
//     });

//     it("Should get contacts", async () => {
//       const response = await fetch(baseUrl() + "/api/v1/contacts");
//       strictEqual(response.status, 200);
//     });

//     it("Should get contact", async () => {
//       const response = await fetch(baseUrl() + "/api/v1/contacts/1");
//       strictEqual(response.status, 200);
//     });

//     it("Should update contact", async () => {
//       const response = await fetch(baseUrl() + "/api/v1/contacts/1", {
//         method: "PUT",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ 
//           first_name: "John",
//           last_name: "Doe",
//           phone_number: "3214567890",
//         }),
//       });
//       strictEqual(response.status, 200);
//     });

//     it("Should delete contact", async () => {
//       const response = await fetch(baseUrl() + "/api/v1/contacts/1", {
//         method: "DELETE",
//       });
//       strictEqual(response.status, 200);
//     });

//   });
// }
