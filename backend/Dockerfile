# Use an official Python runtime as a parent image
FROM python:3.9-slim
RUN apt-get update && apt-get install -y \
        postgresql-server-dev-all \
        build-essential \
        && apt-get clean \
        && rm -rf /var/lib/apt/lists/*

# Set the working directory in the container
WORKDIR /app

# Copy the dependencies file to the working directory
COPY requirements.txt .

# Install any needed packages specified in requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

# Copy the entire project directory into the container
COPY . .

# Expose the port that the app runs on
EXPOSE 3003

# Define the command to run your application using Uvicorn
CMD ["uvicorn", "api:app", "--host", "0.0.0.0", "--port", "3003"]
