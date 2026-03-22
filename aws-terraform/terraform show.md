# aws_instance.cafeine_server:
resource "aws_instance" "cafeine_server" {
    ami                                  = "ami-0c7217cdde317cfec"
    arn                                  = "arn:aws:ec2:us-east-1:270023013421:instance/i-0c7e6e3ba509f6452"
    associate_public_ip_address          = true
    availability_zone                    = "us-east-1c"
    disable_api_stop                     = false
    disable_api_termination              = false
    ebs_optimized                        = false
    force_destroy                        = false
    get_password_data                    = false
    hibernation                          = false
    host_id                              = null
    iam_instance_profile                 = null
    id                                   = "i-0c7e6e3ba509f6452"
    instance_initiated_shutdown_behavior = "stop"
    instance_lifecycle                   = null
    instance_state                       = "running"
    instance_type                        = "t3.micro"
    ipv6_address_count                   = 0
    ipv6_addresses                       = []
    key_name                             = null
    monitoring                           = false
    outpost_arn                          = null
    password_data                        = null
    placement_group                      = null
    placement_group_id                   = null
    placement_partition_number           = 0
    primary_network_interface_id         = "eni-02b26b3dbf1429105"
    private_dns                          = "ip-172-31-19-61.ec2.internal"
    private_ip                           = "172.31.19.61"
    public_dns                           = "ec2-184-73-140-16.compute-1.amazonaws.com"
    public_ip                            = "184.73.140.16"
    region                               = "us-east-1"
    secondary_private_ips                = []
    security_groups                      = [
        "cafeine-security-group",
    ]
    source_dest_check                    = true
    spot_instance_request_id             = null
    subnet_id                            = "subnet-0fac2ed24b17b5cf5"
    tags                                 = {
        "Name" = "Serveur-Cafeine-Projet"
    }
    tags_all                             = {
        "Name" = "Serveur-Cafeine-Projet"
    }
    tenancy                              = "default"
    user_data_replace_on_change          = false
    vpc_security_group_ids               = [
        "sg-07dc8bdffd1fb8631",
    ]

    capacity_reservation_specification {
        capacity_reservation_preference = "open"
    }

    cpu_options {
        amd_sev_snp           = null
        core_count            = 1
        nested_virtualization = null
        threads_per_core      = 2
    }

    credit_specification {
        cpu_credits = "unlimited"
    }

    enclave_options {
        enabled = false
    }

    maintenance_options {
        auto_recovery = "default"
    }

    metadata_options {
        http_endpoint               = "enabled"
        http_protocol_ipv6          = "disabled"
        http_put_response_hop_limit = 1
        http_tokens                 = "optional"
        instance_metadata_tags      = "disabled"
    }

    primary_network_interface {
        delete_on_termination = true
        network_interface_id  = "eni-02b26b3dbf1429105"
    }

    private_dns_name_options {
        enable_resource_name_dns_a_record    = false
        enable_resource_name_dns_aaaa_record = false
        hostname_type                        = "ip-name"
    }

    root_block_device {
        delete_on_termination = true
        device_name           = "/dev/sda1"
        encrypted             = false
        iops                  = 100
        kms_key_id            = null
        tags                  = {}
        tags_all              = {}
        throughput            = 0
        volume_id             = "vol-0709272913a115e64"
        volume_size           = 8
        volume_type           = "gp2"
    }
}

# aws_security_group.cafeine_sg:
resource "aws_security_group" "cafeine_sg" {
    arn                    = "arn:aws:ec2:us-east-1:270023013421:security-group/sg-07dc8bdffd1fb8631"
    description            = "Autoriser HTTP et SSH"
    egress                 = [
        {
            cidr_blocks      = [
                "0.0.0.0/0",
            ]
            description      = null
            from_port        = 0
            ipv6_cidr_blocks = []
            prefix_list_ids  = []
            protocol         = "-1"
            security_groups  = []
            self             = false
            to_port          = 0
        },
    ]
    id                     = "sg-07dc8bdffd1fb8631"
    ingress                = [
        {
            cidr_blocks      = [
                "0.0.0.0/0",
            ]
            description      = null
            from_port        = 22
            ipv6_cidr_blocks = []
            prefix_list_ids  = []
            protocol         = "tcp"
            security_groups  = []
            self             = false
            to_port          = 22
        },
        {
            cidr_blocks      = [
                "0.0.0.0/0",
            ]
            description      = null
            from_port        = 80
            ipv6_cidr_blocks = []
            prefix_list_ids  = []
            protocol         = "tcp"
            security_groups  = []
            self             = false
            to_port          = 80
        },
    ]
        },
    ]
    name                   = "cafeine-security-group"
    name_prefix            = null
    owner_id               = "270023013421"
    region                 = "us-east-1"
    revoke_rules_on_delete = false
    tags                   = {}
    tags_all               = {}
    vpc_id                 = "vpc-09a48684185f9c968"
}


Outputs:

public_ip = "184.73.140.16"