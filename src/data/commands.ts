import type {
  CategorySlug,
  DifficultySlug,
  EnvironmentSlug,
} from "@/data/filters";

export type SyntaxTokenType =
  | "command"
  | "option"
  | "argument"
  | "path"
  | "operator"
  | "variable"
  | "comment"
  | "plain";

export type SyntaxToken = {
  text: string;
  type: SyntaxTokenType;
};

export type CommandOption = {
  option: string;
  description: string;
  example?: string;
};

export type OutputExplanation = {
  label: string;
  description: string;
};

export type CommandExample = {
  title: string;
  description: string;
  command: SyntaxToken[];
  output?: string;
  outputExplanation?: OutputExplanation[];
};

export type RelatedCommand = {
  name: string;
  environment: EnvironmentSlug;
  slug: string;
  description: string;
};

export type CommandDetails = {
  overview: string;
  syntax: SyntaxToken[];
  options?: CommandOption[];
  examples: CommandExample[];
  relatedCommands?: RelatedCommand[];
};

export type Command = {
  name: string;
  slug: string;
  description: string;
  environment: EnvironmentSlug;
  categories: CategorySlug[];
  difficulty: DifficultySlug;
  details?: CommandDetails;
};

export const commands: Command[] = [
  {
    name: "ping",
    slug: "ping",
    description:
      "Test connectivity between your device and another host on a network.",
    environment: "cmd",
    categories: ["networking", "troubleshooting"],
    difficulty: "beginner",

    details: {
      overview:
        "The ping command checks whether another device, server, or website can be reached across an IP network. It sends ICMP Echo Request packets to the destination and waits for Echo Reply packets. Ping is commonly one of the first commands used when troubleshooting network connectivity.",

      syntax: [
        {
          text: "ping",
          type: "command",
        },
        {
          text: " ",
          type: "plain",
        },
        {
          text: "[options]",
          type: "option",
        },
        {
          text: " ",
          type: "plain",
        },
        {
          text: "<target>",
          type: "argument",
        },
      ],

      options: [
        {
          option: "-t",
          description:
            "Continuously ping the target until the command is manually stopped.",
          example: "ping -t google.com",
        },
        {
          option: "-n <count>",
          description:
            "Specify how many Echo Request packets should be sent.",
          example: "ping -n 10 google.com",
        },
        {
          option: "-4",
          description:
            "Force ping to use IPv4 when contacting the destination.",
          example: "ping -4 google.com",
        },
        {
          option: "-6",
          description:
            "Force ping to use IPv6 when contacting the destination.",
          example: "ping -6 google.com",
        },
        {
          option: "-w <timeout>",
          description:
            "Specify how long, in milliseconds, ping should wait for each reply.",
          example: "ping -w 2000 google.com",
        },
      ],

      examples: [
        {
          title: "Test connectivity to a website",
          description:
            "Send ICMP Echo Requests to google.com to check whether the destination can be reached.",
          command: [
            {
              text: "ping",
              type: "command",
            },
            {
              text: " ",
              type: "plain",
            },
            {
              text: "google.com",
              type: "argument",
            },
          ],

          output: `Pinging google.com [142.250.187.206] with 32 bytes of data:
Reply from 142.250.187.206: bytes=32 time=14ms TTL=117
Reply from 142.250.187.206: bytes=32 time=13ms TTL=117
Reply from 142.250.187.206: bytes=32 time=15ms TTL=117
Reply from 142.250.187.206: bytes=32 time=14ms TTL=117

Ping statistics for 142.250.187.206:
    Packets: Sent = 4, Received = 4, Lost = 0 (0% loss),
Approximate round trip times in milli-seconds:
    Minimum = 13ms, Maximum = 15ms, Average = 14ms`,

          outputExplanation: [
            {
              label: "Reply from",
              description:
                "Shows that the destination successfully received the request and sent a response.",
            },
            {
              label: "bytes",
              description:
                "Shows the size of the ICMP response packet returned by the destination.",
            },
            {
              label: "time",
              description:
                "Shows the approximate round-trip time between your device and the destination.",
            },
            {
              label: "TTL",
              description:
                "Time To Live limits how many network hops the packet can travel before being discarded.",
            },
            {
              label: "Packet loss",
              description:
                "Shows how many packets failed to receive a response. Zero percent loss normally indicates successful communication.",
            },
          ],
        },

        {
          title: "Ping an IP address",
          description:
            "Ping a device directly using its IPv4 address instead of a hostname.",
          command: [
            {
              text: "ping",
              type: "command",
            },
            {
              text: " ",
              type: "plain",
            },
            {
              text: "192.168.1.1",
              type: "argument",
            },
          ],

          output: `Pinging 192.168.1.1 with 32 bytes of data:
Reply from 192.168.1.1: bytes=32 time<1ms TTL=64
Reply from 192.168.1.1: bytes=32 time<1ms TTL=64
Reply from 192.168.1.1: bytes=32 time<1ms TTL=64
Reply from 192.168.1.1: bytes=32 time<1ms TTL=64

Ping statistics for 192.168.1.1:
    Packets: Sent = 4, Received = 4, Lost = 0 (0% loss),`,
        },

        {
          title: "Send ten ping requests",
          description:
            "Use the -n option to control how many Echo Request packets Windows sends.",
          command: [
            {
              text: "ping",
              type: "command",
            },
            {
              text: " ",
              type: "plain",
            },
            {
              text: "-n",
              type: "option",
            },
            {
              text: " ",
              type: "plain",
            },
            {
              text: "10",
              type: "argument",
            },
            {
              text: " ",
              type: "plain",
            },
            {
              text: "google.com",
              type: "argument",
            },
          ],

          output: `Pinging google.com [142.250.187.206] with 32 bytes of data:
Reply from 142.250.187.206: bytes=32 time=14ms TTL=117
Reply from 142.250.187.206: bytes=32 time=13ms TTL=117
...

Ping statistics for 142.250.187.206:
    Packets: Sent = 10, Received = 10, Lost = 0 (0% loss),`,
        },
      ],

      relatedCommands: [
        {
          name: "ipconfig",
          environment: "cmd",
          slug: "ipconfig",
          description:
            "View and troubleshoot Windows IP configuration.",
        },
        {
          name: "tracert",
          environment: "cmd",
          slug: "tracert",
          description:
            "Trace the route packets take to reach a destination.",
        },
      ],
    },
  },

  {
    name: "ipconfig",
    slug: "ipconfig",
    description:
      "View and troubleshoot Windows IP configuration and network adapter information.",
    environment: "cmd",
    categories: ["networking", "troubleshooting"],
    difficulty: "beginner",

    details: {
      overview:
        "ipconfig displays and manages TCP/IP configuration for Windows network adapters. Use it to find your IPv4 address, subnet mask and default gateway when investigating connectivity problems. The /all option also shows DNS and DHCP information. Other options refresh DHCP configuration or clear the local DNS resolver cache. Run ipconfig alone for a basic summary, or add an option from the list below; square brackets in the syntax mean the option is optional. Outputs here are abbreviated, illustrative examples using private addresses and an invented computer name and MAC address. Your adapter names and values will differ.",

      syntax: [
        { text: "ipconfig", type: "command" },
        { text: " ", type: "plain" },
        { text: "[option]", type: "option" },
      ],

      options: [
        {
          option: "/all",
          description:
            "Show detailed configuration for every adapter, including its MAC address, DHCP settings and DNS servers.",
          example: "ipconfig /all",
        },
        {
          option: "/release [adapter]",
          description:
            "Release DHCP-assigned IPv4 configuration. This interrupts IPv4 connectivity on affected adapters until configuration is obtained again. Omit the adapter to target all eligible adapters; supply its name to limit the operation. Quote names containing spaces. This does not release a manually configured static address.",
          example: 'ipconfig /release "Ethernet"',
        },
        {
          option: "/renew [adapter]",
          description:
            "Request renewed IPv4 configuration from DHCP for automatically configured adapters. Omit the adapter to target all eligible adapters, or provide its name. A reachable DHCP server is needed for a successful lease; renewal does not guarantee a different address.",
          example: 'ipconfig /renew "Ethernet"',
        },
        {
          option: "/flushdns",
          description:
            "Clear dynamically cached DNS answers, including cached failures, from the Windows resolver cache. Useful after a DNS change; it does not change your configured DNS servers.",
          example: "ipconfig /flushdns",
        },
        {
          option: "/displaydns",
          description:
            "Inspect the local DNS resolver cache, including cached answers and entries loaded from the Hosts file. This displays cached information rather than performing a fresh DNS lookup.",
          example: "ipconfig /displaydns",
        },
      ],

      examples: [
        {
          title: "Find your address and default gateway",
          description:
            "Run ipconfig before testing connectivity to check which IPv4 settings Windows is using. This abbreviated example shows one connected Ethernet adapter; a computer may also list Wi-Fi, VPN or disconnected adapters.",
          command: [{ text: "ipconfig", type: "command" }],
          output: `Windows IP Configuration

Ethernet adapter Ethernet:

   Connection-specific DNS Suffix  . :
   IPv4 Address. . . . . . . . . . . : 192.168.10.25
   Subnet Mask . . . . . . . . . . . : 255.255.255.0
   Default Gateway . . . . . . . . . : 192.168.10.1`,
          outputExplanation: [
            {
              label: "Ethernet adapter Ethernet",
              description:
                "The heading identifies the adapter whose settings follow. Check the adapter used for the connection you are troubleshooting.",
            },
            {
              label: "IPv4 Address",
              description:
                "192.168.10.25 is this adapter's address on the example private network, not its public internet address.",
            },
            {
              label: "Subnet Mask",
              description:
                "255.255.255.0 corresponds to /24. Together with the address, it identifies the local subnet as 192.168.10.0/24.",
            },
            {
              label: "Default Gateway",
              description:
                "192.168.10.1 is the router used for destinations without a more specific route, commonly including internet destinations. Its presence alone does not prove internet access works.",
            },
          ],
        },
        {
          title: "Inspect DNS and DHCP settings",
          description:
            "Use /all when a support technician needs more than the basic address summary. These selected lines show an adapter using DHCP and a local router providing both DHCP and DNS services.",
          command: [
            { text: "ipconfig", type: "command" },
            { text: " ", type: "plain" },
            { text: "/all", type: "option" },
          ],
          output: `Windows IP Configuration

   Host Name . . . . . . . . . . . . : TRAINING-PC

Ethernet adapter Ethernet:

   Physical Address. . . . . . . . . : 02-00-00-00-00-25
   DHCP Enabled. . . . . . . . . . . : Yes
   IPv4 Address. . . . . . . . . . . : 192.168.10.25(Preferred)
   Subnet Mask . . . . . . . . . . . : 255.255.255.0
   Default Gateway . . . . . . . . . : 192.168.10.1
   DHCP Server . . . . . . . . . . . : 192.168.10.1
   DNS Servers . . . . . . . . . . . : 192.168.10.1`,
          outputExplanation: [
            {
              label: "Host Name",
              description:
                "TRAINING-PC is the illustrative Windows computer name. It is separate from the adapter name Ethernet.",
            },
            {
              label: "Physical Address",
              description:
                "The adapter's MAC address identifies its interface on the local network. It is different from an IP address; the value shown here is invented.",
            },
            {
              label: "DHCP Enabled",
              description:
                "Yes means the adapter is configured to obtain IPv4 settings automatically. This setting alone does not prove that a DHCP lease was obtained successfully.",
            },
            {
              label: "DHCP Server",
              description:
                "The server that supplied the displayed DHCP lease. In this example the router performs that role.",
            },
            {
              label: "DNS Servers",
              description:
                "The resolver addresses configured for this adapter, used to look up names. Windows can list multiple servers; this example uses the router as its resolver.",
            },
          ],
        },
        {
          title: "Clear cached DNS answers",
          description:
            "Use /flushdns when a stale answer or cached lookup failure may be affecting name resolution. Run Command Prompt as administrator for this troubleshooting action. Clearing the cache does not repair an unreachable DNS server or guarantee that a website will load.",
          command: [
            { text: "ipconfig", type: "command" },
            { text: " ", type: "plain" },
            { text: "/flushdns", type: "option" },
          ],
          output: `Windows IP Configuration

Successfully flushed the DNS Resolver Cache.`,
          outputExplanation: [
            {
              label: "Successfully flushed the DNS Resolver Cache",
              description:
                "Windows cleared its dynamic resolver cache entries. Retry the affected name lookup or connection; this message does not confirm that the next lookup will succeed.",
            },
          ],
        },
        {
          title: "Release DHCP-assigned IPv4 configuration",
          description:
            "Use /release only when deliberately resetting DHCP configuration. Without an adapter name it affects all eligible adapters and can disconnect a remote support session. Plan to run /renew afterwards; releasing is not required for every renewal. This abbreviated example shows the released IPv4 fields for one adapter. IPv6 lines may still appear.",
          command: [
            { text: "ipconfig", type: "command" },
            { text: " ", type: "plain" },
            { text: "/release", type: "option" },
          ],
          output: `Windows IP Configuration

Ethernet adapter Ethernet:

   Connection-specific DNS Suffix  . :
   Default Gateway . . . . . . . . . :`,
          outputExplanation: [
            {
              label: "Default Gateway",
              description:
                "The blank field and missing IPv4 Address line reflect the released IPv4 configuration in this example. The adapter cannot use its previous DHCP address for IPv4 communication until it obtains configuration again.",
            },
          ],
        },
        {
          title: "Obtain or renew a DHCP lease",
          description:
            "Run /renew to refresh DHCP configuration, including after the preceding release example. These selected lines illustrate a successful renewal. Windows may receive the same address again. If the DHCP server cannot be reached, renewal may time out instead of producing this result.",
          command: [
            { text: "ipconfig", type: "command" },
            { text: " ", type: "plain" },
            { text: "/renew", type: "option" },
          ],
          output: `Windows IP Configuration

Ethernet adapter Ethernet:

   Connection-specific DNS Suffix  . :
   IPv4 Address. . . . . . . . . . . : 192.168.10.25
   Subnet Mask . . . . . . . . . . . : 255.255.255.0
   Default Gateway . . . . . . . . . : 192.168.10.1`,
          outputExplanation: [
            {
              label: "IPv4 Address",
              description:
                "The adapter has an IPv4 address again after this successful renewal. Compare it with the expected subnet for the network.",
            },
            {
              label: "Default Gateway",
              description:
                "The router address is present again. You can now use ping to test reachability; a renewed lease alone does not prove that every network service works.",
            },
          ],
        },
      ],

      relatedCommands: [
        {
          name: "ping",
          environment: "cmd",
          slug: "ping",
          description:
            "Test reachability after checking your adapter's IP configuration.",
        },
        {
          name: "tracert",
          environment: "cmd",
          slug: "tracert",
          description:
            "Investigate the route towards a destination when connectivity problems remain.",
        },
      ],
    },
  },

  {
    name: "tracert",
    slug: "tracert",
    description:
      "Trace the network path taken by packets from your computer to a destination.",
    environment: "cmd",
    categories: ["networking", "troubleshooting"],
    difficulty: "intermediate",
  },

  {
    name: "Get-Process",
    slug: "get-process",
    description:
      "View processes currently running on a Windows system using PowerShell.",
    environment: "powershell",
    categories: ["processes"],
    difficulty: "beginner",
  },

  {
    name: "ls",
    slug: "ls",
    description:
      "List files and directories within the current Linux directory.",
    environment: "bash",
    categories: ["files"],
    difficulty: "beginner",
  },

  {
    name: "chmod",
    slug: "chmod",
    description:
      "Change file and directory permissions on Linux systems.",
    environment: "bash",
    categories: ["files", "users"],
    difficulty: "intermediate",
  },
];

export function getCommand(environment: string, slug: string): Command | undefined {
  return commands.find(
    (command) => command.environment === environment && command.slug === slug,
  );
}
