FROM mcr.microsoft.com/dotnet/sdk:10.0 AS build
WORKDIR /src

COPY ["JesterTech.Server.csproj", "./"]
RUN dotnet restore "./JesterTech.Server.csproj"

COPY . .
RUN dotnet publish "./JesterTech.Server.csproj" -c Release -o /app/publish /p:UseAppHost=false

FROM mcr.microsoft.com/dotnet/aspnet:10.0 AS final
WORKDIR /app
EXPOSE 8080

COPY --from=build /app/publish .
ENTRYPOINT ["dotnet", "JesterTech.Server.dll"]