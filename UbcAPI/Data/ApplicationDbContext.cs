using Microsoft.EntityFrameworkCore;
using UbcAPI.Models;

namespace UbcAPI.Data;

public class ApplicationDbContext : DbContext
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) { }

    public DbSet<Student>? Students { get; set; }
    public DbSet<User>? Users { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        // Mapeamento da entidade Users para a tabela USERS
        modelBuilder.Entity<User>(entity =>
        {
            entity.ToTable("USERS");
            entity.Property(e => e.Id).HasColumnName("ID");
            entity.Property(e => e.UserName).HasColumnName("USERNAME");
            entity.Property(e => e.UserPassword).HasColumnName("USERPASSWORD");
        });

         // Mapeamento da entidade Student para a tabela STUDENTS
        modelBuilder.Entity<Student>(entity =>
        {
            entity.ToTable("STUDENTS");
            entity.Property(e => e.Id).HasColumnName("ID");
            entity.Property(e => e.Nome).HasColumnName("NOME");
            entity.Property(e => e.Idade).HasColumnName("IDADE");
            entity.Property(e => e.Serie).HasColumnName("SERIE");
            entity.Property(e => e.NotaMedia).HasColumnName("NOTAMEDIA");
            entity.Property(e => e.Endereco).HasColumnName("ENDERECO");
            entity.Property(e => e.NomePai).HasColumnName("NOMEPAI");
            entity.Property(e => e.NomeMae).HasColumnName("NOMEMAE");
            entity.Property(e => e.DataNascimento).HasColumnName("DATANASCIMENTO");
        });
    }
}
