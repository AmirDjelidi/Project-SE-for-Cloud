provider "aws" {
  region = "us-east-1"
}

resource "aws_security_group" "cafeine_sg" {
  name        = "cafeine-security-group"
  description = "Autoriser HTTP et SSH"

  ingress {
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

resource "aws_instance" "cafeine_server" {
  ami           = "ami-0c7217cdde317cfec" # Ubuntu 22.04 LTS en us-east-1
  instance_type = "t3.micro"
  vpc_security_group_ids = [aws_security_group.cafeine_sg.id]

  tags = {
    Name = "Serveur-Cafeine-Projet"
  }
}

output "public_ip" {
  value = aws_instance.cafeine_server.public_ip
}