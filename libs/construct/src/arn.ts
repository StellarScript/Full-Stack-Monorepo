export class Arn {
   public static Any(): string {
      return `*`;
   }

   public static Vpc(region: string, account: string, vpcId: string): string {
      return `arn:aws:ec2:${region}:${account}:vpc/${vpcId}`;
   }

   public static VpcSubnet(region: string, account: string, subnetId: string): string {
      return `arn:aws:ec2:${region}:${account}:subnet/${subnetId}`;
   }

   public static VpcRouteTable(region: string, account: string, routeTableId: string): string {
      return `arn:aws:ec2:${region}:${account}:route-table/${routeTableId}`;
   }

   public static VpcInternetGateway(region: string, account: string, igId: string): string {
      return `arn:aws:ec2:${region}:${account}:internet-gateway/${igId}`;
   }

   public static Alb(region: string, account: string, albName: string): string {
      return `arn:aws:elasticloadbalancing:${region}:${account}:loadbalancer/${albName}`;
   }

   public static SecurityGroup(region: string, account: string, id: string): string {
      return `arn:aws:ec2:${region}:${account}:security-group/${id}`;
   }

   public static Role(account: string, roleNameWithPath: string): string {
      return `arn:aws:iam::${account}:role/${roleNameWithPath}`;
   }

   public static Policy(account: string, policyName: string): string {
      return `arn:aws:iam::${account}:policy/${policyName}`;
   }

   public static NatGatewayEc2(region: string, account: string, natGatewayId: string): string {
      return `arn:aws:ec2:${region}:${account}:natgateway/${natGatewayId}`;
   }

   public static SSMParameter(region: string, account: string, ssmWithPath: string): string {
      return `arn:aws:ssm:${region}:${account}:parameter/${ssmWithPath}`;
   }

   public static CloudFormationStack(region: string, account: string, name: string, id: string): string {
      return `arn:aws:cloudformation:${region}:${account}:stack/${name}/${id}`; // stackName, stackId
   }

   public static ElasticIpEc2(region: string, account: string, id: string): string {
      return `arn:aws:ec2:${region}:${account}:elastic-ip/${id}`;
   }

   public static HostedZone(hostedZoneId: string): string {
      return `arn:aws:route53:::hostedzone/${hostedZoneId}`;
   }

   public static HostedZoneChnage(hostedZoneId: string): string {
      return `arn:aws:route53:::change/${hostedZoneId}`;
   }

   public static EcsCluster(region: string, account: string, clusterName: string): string {
      return `arn:aws:ecs:${region}:${account}:cluster/${clusterName}`;
   }

   public static LogGroup(region: string, account: string, logGroupName: string): string {
      return `arn:aws:logs:${region}:${account}:log-group:${logGroupName}`;
   }

   public static ElbTargetGroup(region: string, account: string, id: string, name: string): string {
      // check for name | id
      return `arn:aws:elasticloadbalancing:${region}:${account}:targetgroup/${id}/${name}`;
   }

   public static EcsService(region: string, account: string, id: string, name: string): string {
      return `arn:aws:ecs:${region}:${account}:service/${id}/${name}`;
   }

   public static ImageEcr(region: string, account: string, image: string, tag?: string): string {
      return `${account}.dkr.ecr.${region}.amazonaws.com/${image}${tag ? `:${tag}` : ''}`;
   }
}
