using Microsoft.EntityFrameworkCore;
using LojaPratas.Api.Models;

namespace LojaPratas.Api.Data
{
    public class AppDbContext : DbContext
    {
        
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {

        }
        public DbSet<Produto> Produtos { get; set; }
    }
}
