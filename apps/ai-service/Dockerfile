FROM python:3.12-slim
WORKDIR /app

# Install pip requirements
COPY requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

# Copy service logic
COPY . .

EXPOSE 8000
CMD ["python", "main.py"]
