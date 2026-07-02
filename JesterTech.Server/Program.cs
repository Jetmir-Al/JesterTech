using JesterTech.Server.Data;
using JesterTech.Server.Repositories;
using JesterTech.Server.Services;
using Microsoft.EntityFrameworkCore;


var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));


builder.Services.AddScoped<IAuthRepository, AuthRepository>();
builder.Services.AddScoped<IProductRepository, ProductRepository>();
builder.Services.AddScoped<IReviewRepository, ReviewRepository>();
builder.Services.AddScoped<IPurchaseRepository, PurchaseRepository>();

builder.Services.AddHttpClient<IAiService, GroqAiService>();
builder.Services.AddControllersWithViews();


builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddCors(options =>
{
    options.AddPolicy(name: "JesterTechPolicy",
                      policy => 
                      {
                          policy.WithOrigins("https://localhost:62346", "http://localhost:5231", "https://localhost:7070")
                                .AllowAnyHeader()
                                .AllowAnyMethod()
                                .AllowCredentials();
                      });
}
    );

builder.Services.AddIdentityServices(builder.Configuration);

var app = builder.Build();



app.UseDefaultFiles();
app.UseStaticFiles();


if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();


app.UseCors("JesterTechPolicy");



app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();


app.Run();
