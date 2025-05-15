using HoaNam.Application;
using HoaNam.Infrastructure;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();


//builder.Services.AddApplication();      
builder.Services.AddInfrastructure(builder.Configuration);

builder.Services.AddAutoMapper(typeof(Program), typeof(AssemblyReference));

builder.Services.AddMediatR(cfg =>
{
	cfg.RegisterServicesFromAssembly(typeof(HoaNam.Application.AssemblyReference).Assembly);
});

builder.Services.AddCors(options =>
{
	options.AddPolicy("AllowSpecificOrigin", policy =>
	{
		policy.WithOrigins("http://example.com")
			.AllowAnyHeader()
			.AllowAnyMethod()
			.WithExposedHeaders("WWW-Authenticate");
	});

	options.AddPolicy("AllowAll", policy =>
	{
		policy.AllowAnyOrigin()
			.AllowAnyHeader()
			.AllowAnyMethod()
			.WithExposedHeaders("WWW-Authenticate");
	});
	options.AddPolicy("AllowFrontend", policy =>
	{
		policy.WithOrigins("http://localhost:5173")
			.AllowAnyHeader()
			.AllowAnyMethod()
			.AllowCredentials()
			.WithExposedHeaders("WWW-Authenticate");
	});
});

var app = builder.Build();



// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
	app.UseSwagger();
	app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseCors("AllowFrontend");
app.UseAuthentication();

app.UseAuthorization();
app.MapControllers();

app.Run();
