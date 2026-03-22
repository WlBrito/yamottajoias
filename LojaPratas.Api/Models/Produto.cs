using System.ComponentModel.DataAnnotations;
namespace LojaPratas.Api.Models
{
    public class Produto
    {
        public int Id { get; set; }
        [Required]
        [MaxLength(100)]
        public string Nome { get; set; } = string.Empty;
        public string Descricao { get; set; } = string.Empty;
        [Range(0.01, 99999.99)]
        public decimal Preco { get; set; }
        [Range(0, int.MaxValue)]
        public int Quantidade { get; set; }
        public string ImagemUrl { get; set; } = string.Empty;
    }
}