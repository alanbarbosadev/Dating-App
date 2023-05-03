using DatingAppAPI.Data;
using DatingAppAPI.Data.Repositories;
using DatingAppAPI.Helpers;
using DatingAppAPI.Interfaces;
using DatingAppAPI.Services;
using Microsoft.EntityFrameworkCore;

namespace DatingAppAPI.Extensions
{
    public static class ApplicationServiceExtension
    {
        public static IServiceCollection AddApplicationServices(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddScoped<ITokenService, TokenService>();
            services.AddScoped<IUserRepository, UserRepository>();
            services.AddAutoMapper(typeof(AutoMapperProfiles).Assembly);
            services.AddDbContext<DataContext>(options => options.UseSqlite(configuration.GetConnectionString("Default")));

            return services;
        }
    }
}
