FROM postgres:latest

# Any additional configurations or setup can be added here
ENV POSTGRES_HOST=postgres
ENV POSTGRES_PORT=5432
ENV POSTGRES_USER=admin
ENV POSTGRES_PASSWORD=admin
ENV POSTGRES_DB=interview

COPY ./bin/init.sql /docker-entrypoint-initdb.d/

EXPOSE 5432