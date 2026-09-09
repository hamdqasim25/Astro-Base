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
  output: string;
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