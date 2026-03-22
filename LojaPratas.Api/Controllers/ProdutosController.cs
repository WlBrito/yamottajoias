using LojaPratas.Api.Data;
using LojaPratas.Api.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace LojaPratas.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProdutosController : ControllerBase
    {
        private readonly AppDbContext _context;
        public ProdutosController(AppDbContext context)
        {
            _context = context;
        }
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Produto>>> GetProdutos()
        {
            return await _context.Produtos.ToListAsync();
        }
        [Authorize]
        [HttpPost]
        public async Task<ActionResult<Produto>> PostProduto([FromBody]Produto produto)
        {
            _context.Produtos.Add(produto);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetProdutos), new { id = produto.Id }, produto);
        }
        [Authorize]
        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteProduto(int id)
        {
            var produto = await _context.Produtos.FindAsync(id);
            if(produto != null)
            {
                _context.Produtos.Remove(produto);
                await _context.SaveChangesAsync();
                return NoContent(); //isso indica que a operação foi bem-sucedida, mas não há conteúdo para retornar (204 No Content)
            }
            return NotFound(); //isso indica que o recurso solicitado não foi encontrado (404 Not Found)
        }
        [Authorize]
        [HttpPut("{id}")]
        public async Task<ActionResult> PutProduto(int id, [FromBody]Produto produto)
        {
            if(id != produto.Id)
                return BadRequest(); //isso indica que a solicitação é inválida (400 Bad Request)
            var produtoExistente = await _context.Produtos.FindAsync(id);
            if(produtoExistente != null)
            {
                _context.Entry(produtoExistente).CurrentValues.SetValues(produto);
                await _context.SaveChangesAsync();
                return NoContent();
            }
            return NotFound();
        }
    }
}
