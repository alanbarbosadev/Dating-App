using DatingAppAPI.Errors;
using System.Net;
using System.Text.Json;

namespace DatingAppAPI.Middlewares
{
    public class ExceptionMiddleware
    {
        private readonly RequestDelegate _next;
        private readonly ILogger<ExceptionMiddleware> _logger;
        private readonly IHostEnvironment _environment;

        public ExceptionMiddleware(RequestDelegate next, ILogger<ExceptionMiddleware> logger, IHostEnvironment environment)
        {
            _next = next; //Processes the http requests
            _logger = logger; //To write the exception in the console
            _environment = environment; //To verify whether the app is running in development mode or production
        }

        public async Task InvokeAsync(HttpContext context) //HttpContext context represents the http request coming from a certain context
        {
            try
            {   //Try processing the request that came from the context
                await _next(context);
            } 
            catch (Exception ex)
            {
                //In case the request return an exception

                _logger.LogError(ex, ex.Message); //Logs the error in the console

                //Organizes the exception
                context.Response.ContentType = "application/json"; //Whats comes in the header of the response
                context.Response.StatusCode = (int)HttpStatusCode.InternalServerError; //All the exceptions will return the InternalServerError status code which is 500

                //If the environment is development the response will have status code, message, details. If it's production, the response will have only the status code and a message saying "Internal Server Error"
                var response = _environment.IsDevelopment() ? new APIException(context.Response.StatusCode, ex.Message, ex.StackTrace?.ToString()) : new APIException(context.Response.StatusCode, "Internal Server Error");

                //Formats the json response to variableVarible(camel case) format
                var options = new JsonSerializerOptions { PropertyNamingPolicy = JsonNamingPolicy.CamelCase };

                //Transforms the response in json
                var json = JsonSerializer.Serialize(response, options);

                //return the formatted json response
                await context.Response.WriteAsync(json);
            }
        }
    }
}
