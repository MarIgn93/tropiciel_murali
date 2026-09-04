var builder = WebApplication.CreateBuilder(args);

builder.WebHost.UseUrls("http://0.0.0.0:5204");

builder.Services.AddControllers();

var app = builder.Build();

// app.UseHttpsRedirection();

app.MapControllers();

app.Run();