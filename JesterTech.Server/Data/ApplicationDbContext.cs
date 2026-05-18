using Microsoft.EntityFrameworkCore;
using JesterTech.Server.Models;

namespace JesterTech.Server.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {

        }
        public DbSet<Users> Users { get; set; }
        public DbSet<Products> Products { get; set; }
        public DbSet<Reviews> Reviews { get; set; }
        public DbSet<Purchases> Purchases { get; set; }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Products>()
                .Property(p => p.Price)
                .HasColumnType("decimal(18,2)");

            modelBuilder.Entity<Purchases>()
                .Property(p => p.Total)
                .HasColumnType("decimal(18,2)");
        }
    }
}
