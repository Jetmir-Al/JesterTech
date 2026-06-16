using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace JesterTech.Server.Migrations
{
    /// <inheritdoc />
    public partial class FixPurchaseBug : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Address",
                table: "Purchases",
                type: "text",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Address",
                table: "Purchases");
        }
    }
}
