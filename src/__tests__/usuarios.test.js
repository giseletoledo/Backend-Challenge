import request from 'supertest';
import {jest} from '@jest/globals';
import app from '../app';
import UsuariosController from '../controllers/UsuariosController';


describe("Testes para a rota GET /abrigos", () => {
  it("Deve retornar todos os abrigos com status 200", async () => {
    // Chama o método listarAbrigos do controlador
    const mockResult = [
      { 
        "_id": "643843c808cadf3cb0f09c83",
        "login": "novolar",
        "senha": "$2b$10$t5tM.HC7jUibAy3eytyLE.Ilqk304Jqs6gY2LJiijs8XTVk/qQnPO",
        "tipo": "Abrigo",
        "nome": "Novo Lar",
        "foto": "",
        "endereco": "Rua das palmeiras, 34",
        "telefone": "99999-9999",
        "cidade": "São Paulo",
        "sobre": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        "__v": 0
      }
    ];
    
    UsuariosController.listarAbrigos = jest.fn().mockResolvedValue(mockResult);

    // Faz a requisição HTTP GET /abrigos
    const response = await request(app).get("/abrigos");

    // Verifica se o status da resposta é 200 e se o corpo da resposta contém os abrigos
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual(mockResult);

    UsuariosController.listarAbrigos.mockRestore();
  });

  it("Deve retornar um erro com status 400 se algum campo obrigatório estiver faltando", async () => {
    // Simula uma requisição com um objeto que não contém um campo obrigatório
    const abrigo = {
      "tipo": "Abrigo",
      "nome": "Cantinho Pet",
      "foto": "",
      "endereco": "Rua das palmeiras, 34",
      "telefone": "99999-9999",
      "cidade": "São Paulo",
      "sobre": "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
   };
  
  
    // Faz a requisição HTTP POST /abrigos
    const response = await request(app).post("/abrigos").send(abrigo);
  
    // Verifica se o status da resposta é 400 e se a mensagem de erro está presente no corpo da resposta
    expect(response.statusCode).toBe(400);
    expect(response.body).toStrictEqual({
      mensagem: 'Os seguintes erros foram encontrados: A senha é obrigatória; O login é obrigatório',
      status: 400
    });
  
  });
  
  it("Deve retornar um erro com status 500 se ocorrer um erro ao buscar os abrigos", async () => {
    // Simula um erro ao chamar o método listarAbrigos do controlador
    const mockError = new Error("Erro ao buscar abrigos");
    UsuariosController.listarAbrigos = jest.fn().mockRejectedValue(mockError);

     // Faz a requisição HTTP GET /abrigos
     const response = await request(app).get("/abrigos");
 
     // Verifica se o status da resposta é 500 e se a mensagem de erro está presente no corpo da resposta
     expect(response.statusCode).toBe(500);
 
     expect(response.body).toBe(mockError.message);
     expect(UsuariosController.listarAbrigos).toHaveBeenCalledWith();
     expect(UsuariosController.listarAbrigos.mock.calls.length).toBe(1);

    UsuariosController.listarAbrigos.mockRestore();
  });
});

