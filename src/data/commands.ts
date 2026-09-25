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
    details: {
      overview:
        "tracert investigates the path from your Windows computer towards a network destination. It sends probes with increasing hop limits and reports the replies, helping support technicians compare routes or investigate where replies stop. A trace is a snapshot, not a complete map of every device or proof that an application works. Use a hostname or IP address as the target; bracketed options are optional. These outputs illustrate a small test network using private and documentation-only addresses and invented .example names. Replace the targets with a destination you can actually reach.",
      syntax: [
        { text: "tracert", type: "command" },
        { text: " ", type: "plain" },
        { text: "[options]", type: "option" },
        { text: " ", type: "plain" },
        { text: "<target>", type: "argument" },
      ],
      options: [
        {
          option: "-d",
          description:
            "Skip reverse DNS lookups for hop addresses. This can avoid delays while displaying names; a hostname supplied as the target still needs to resolve.",
          example: "tracert -d 192.168.20.10",
        },
        {
          option: "-h <maximum-hops>",
          description:
            "Set the hop limit for the trace instead of the default 30. A low limit can stop the trace before it reaches the destination.",
          example: "tracert -h 10 192.168.20.10",
        },
        {
          option: "-w <milliseconds>",
          description:
            "Set how long to wait for each probe reply; the default is 4000 milliseconds. Shorter waits finish unanswered probes sooner but may miss slow replies.",
          example: "tracert -w 1000 192.168.20.10",
        },
        {
          option: "-4",
          description:
            "Trace using IPv4. Useful when a hostname has both IPv4 and IPv6 addresses and you want to investigate the IPv4 path specifically.",
          example: "tracert -4 server.example",
        },
        {
          option: "-6",
          description:
            "Trace using IPv6. The destination and your connection need IPv6 support. Use this instead of -4 when investigating the IPv6 path.",
          example: "tracert -6 server.example",
        },
      ],
      examples: [
        {
          title: "Trace a route with hop names",
          description:
            "Investigate the path to an internal server. In this illustrative network, DNS provides names for the responding routers and destination.",
          command: [
            { text: "tracert", type: "command" },
            { text: " ", type: "plain" },
            { text: "server.example", type: "argument" },
          ],
          output: `Tracing route to server.example [192.168.20.10]
over a maximum of 30 hops:

  1    <1 ms    <1 ms    <1 ms  gateway.example [192.168.10.1]
  2     2 ms     3 ms     2 ms  router.example [10.0.0.1]
  3     4 ms     4 ms     5 ms  server.example [192.168.20.10]

Trace complete.`,
          outputExplanation: [
            { label: "1, 2, 3", description: "Hop numbers reflect increasing probe hop limits. The final responding address here matches the destination." },
            { label: "<1 ms / 2 ms / 3 ms", description: "The three timings are separate round trips from your computer to that hop and back, not the travel time between adjacent routers. <1 ms means less than one millisecond." },
            { label: "router.example [10.0.0.1]", description: "The address identifies the responding interface; the name is supplied by DNS when available. A name alone does not identify the cause of a fault." },
          ],
        },
        {
          title: "Show addresses without reverse DNS lookups",
          description:
            "Use -d with a known IP address to inspect the route without waiting for hop-name lookups. It changes name display, not the underlying forwarding path.",
          command: [
            { text: "tracert", type: "command" },
            { text: " ", type: "plain" },
            { text: "-d", type: "option" },
            { text: " ", type: "plain" },
            { text: "192.168.20.10", type: "argument" },
          ],
          output: `Tracing route to 192.168.20.10 over a maximum of 30 hops

  1    <1 ms    <1 ms    <1 ms  192.168.10.1
  2     2 ms     2 ms     3 ms  10.0.0.1
  3     4 ms     5 ms     4 ms  192.168.20.10

Trace complete.`,
          outputExplanation: [
            { label: "192.168.20.10", description: "The target responds at hop 3. The absence of names is expected with -d, not evidence of a DNS failure." },
          ],
        },
        {
          title: "Interpret an intermediate timeout",
          description:
            "Limit this IPv4 investigation to five hops and wait one second per probe. The example reaches its destination despite a silent intermediate hop. Shorter waits can create more timeout markers, so compare with a longer wait before drawing conclusions.",
          command: [
            { text: "tracert", type: "command" },
            { text: " ", type: "plain" },
            { text: "-4", type: "option" },
            { text: " ", type: "plain" },
            { text: "-d", type: "option" },
            { text: " ", type: "plain" },
            { text: "-h", type: "option" },
            { text: " ", type: "plain" },
            { text: "5", type: "argument" },
            { text: " ", type: "plain" },
            { text: "-w", type: "option" },
            { text: " ", type: "plain" },
            { text: "1000", type: "argument" },
            { text: " ", type: "plain" },
            { text: "203.0.113.10", type: "argument" },
          ],
          output: `Tracing route to 203.0.113.10 over a maximum of 5 hops

  1    <1 ms    <1 ms    <1 ms  192.168.10.1
  2     *        *        *     Request timed out.
  3    18 ms    20 ms    19 ms  203.0.113.10

Trace complete.`,
          outputExplanation: [
            { label: "*", description: "No matching reply arrived within the wait time for that probe. A router may filter or limit diagnostic replies while continuing to forward traffic." },
            { label: "Request timed out.", description: "All three probes at hop 2 went unanswered. This does not automatically mean that device or route is faulty: the destination replied at hop 3." },
            { label: "Trace complete.", description: "Tracing has ended. Check whether the target address actually appeared; reaching a configured hop limit also ends a trace. Missing later replies alone cannot distinguish filtering from a forwarding problem." },
          ],
        },
      ],
      relatedCommands: [
        { name: "ping", environment: "cmd", slug: "ping", description: "Check whether a destination responds before investigating its route." },
        { name: "ipconfig", environment: "cmd", slug: "ipconfig", description: "Check your local address and default gateway when the first hop is unexpected." },
      ],
    },
  },

  {
    name: "Get-Process",
    slug: "get-process",
    description:
      "View processes currently running on a Windows system using PowerShell.",
    environment: "powershell",
    categories: ["processes"],
    difficulty: "beginner",
    details: {
      overview:
        "Get-Process inspects running processes on the local computer. Use it to check whether an application is running, identify its process ID, or investigate memory use and accumulated CPU time. PowerShell normally returns structured Process objects: the displayed table is only a view of their properties. You can filter, sort, select and pipe those objects without parsing text columns. The simplified syntax below shows common name-based use; -Id is an alternative to -Name. Examples use an illustrative PowerShell 7 display on Windows; Windows PowerShell 5.1 uses different default memory headings and units. PIDs and measurements change, and some protected process properties may be unavailable.",
      syntax: [
        { text: "Get-Process", type: "command" },
        { text: " [", type: "plain" },
        { text: "-Name", type: "option" },
        { text: " ", type: "plain" },
        { text: "<name>", type: "argument" },
        { text: "]", type: "plain" },
      ],
      options: [
        { option: "-Name <name>", description: "Find processes by name, normally without .exe. Wildcards such as note* are supported; several processes may share a name.", example: "Get-Process -Name notepad" },
        { option: "-Id <PID>", description: "Select a process by its numeric ID. Read the current ID from a fresh listing: a process may exit, and Windows can reuse its ID later.", example: "Get-Process -Id 4240" },
        { option: "-IncludeUserName", description: "Include the account running each process on Windows. Run PowerShell as administrator for this query; protected processes can still restrict access. This cannot be combined with -FileVersionInfo.", example: "Get-Process -Name notepad -IncludeUserName" },
        { option: "-FileVersionInfo", description: "Return version information for the process's executable instead of normal Process objects. Useful for checking an application's installed build. Inspecting processes owned by other accounts requires elevation on Windows.", example: "Get-Process -Name notepad -FileVersionInfo" },
      ],
      examples: [
        {
          title: "List running processes",
          description:
            "Take a snapshot of local processes. These are selected illustrative rows rather than a complete machine listing; this command only inspects processes and does not stop them.",
          command: [{ text: "Get-Process", type: "command" }],
          output: ` NPM(K)    PM(M)      WS(M)     CPU(s)      Id  SI ProcessName
 ------    -----      -----     ------      --  -- -----------
     45    62.00     110.50      32.14    2100   1 explorer
     12    18.25      35.50       1.25    4240   1 notepad
     68    85.00     102.25      12.50    5300   1 pwsh`,
          outputExplanation: [
            { label: "Id / ProcessName", description: "Id is the process identifier (PID); ProcessName is its name. Multiple instances can have the same name but different IDs." },
            { label: "CPU(s)", description: "Processor time accumulated across processors since the process started, measured in seconds. It is not current CPU utilisation or a percentage." },
            { label: "WS(M)", description: "The working set: memory pages currently resident in RAM for this process, displayed in MiB in this PowerShell 7 view. Shared pages mean you should not simply add working sets to estimate total RAM use." },
            { label: "PM(M) / NPM(K)", description: "PM is pageable memory shown in MiB; NPM is nonpaged memory shown in KiB in this view. These are different measurements, not values to add to WS as a total." },
            { label: "SI", description: "The Windows session ID. It identifies the session hosting the process, not its owner account or process ID." },
          ],
        },
        {
          title: "Find an application by name",
          description:
            "Check for an open Notepad instance. An exact name that is not running produces an error instead of the example row; multiple instances can produce several rows.",
          command: [
            { text: "Get-Process", type: "command" },
            { text: " ", type: "plain" },
            { text: "-Name", type: "option" },
            { text: " ", type: "plain" },
            { text: "notepad", type: "argument" },
          ],
          output: ` NPM(K)    PM(M)      WS(M)     CPU(s)      Id  SI ProcessName
 ------    -----      -----     ------      --  -- -----------
     12    18.25      35.50       1.25    4240   1 notepad`,
          outputExplanation: [
            { label: "4240", description: "The PID of this illustrative Notepad instance. Use the ID from your own output for a follow-up query." },
          ],
        },
        {
          title: "Inspect a specific process ID",
          description:
            "Follow up on a PID found in the previous listing. This example assumes process 4240 still exists; an exited or nonexistent PID produces an error.",
          command: [
            { text: "Get-Process", type: "command" },
            { text: " ", type: "plain" },
            { text: "-Id", type: "option" },
            { text: " ", type: "plain" },
            { text: "4240", type: "argument" },
          ],
          output: ` NPM(K)    PM(M)      WS(M)     CPU(s)      Id  SI ProcessName
 ------    -----      -----     ------      --  -- -----------
     12    18.25      35.50       1.25    4240   1 notepad`,
        },
        {
          title: "Sort by accumulated CPU time",
          description:
            "Pipe Process objects into Sort-Object, then select three results and three properties. This helps identify processes that have consumed substantial processor time over their lifetime; use a live monitor when you need current CPU usage.",
          command: [
            { text: "Get-Process", type: "command" },
            { text: " ", type: "plain" },
            { text: "|", type: "operator" },
            { text: " ", type: "plain" },
            { text: "Sort-Object", type: "command" },
            { text: " ", type: "plain" },
            { text: "-Property", type: "option" },
            { text: " ", type: "plain" },
            { text: "CPU", type: "argument" },
            { text: " ", type: "plain" },
            { text: "-Descending", type: "option" },
            { text: " ", type: "plain" },
            { text: "|", type: "operator" },
            { text: " ", type: "plain" },
            { text: "Select-Object", type: "command" },
            { text: " ", type: "plain" },
            { text: "-First", type: "option" },
            { text: " ", type: "plain" },
            { text: "3", type: "argument" },
            { text: " ", type: "plain" },
            { text: "-Property", type: "option" },
            { text: " ", type: "plain" },
            { text: "Id,ProcessName,CPU", type: "argument" },
          ],
          output: `  Id ProcessName    CPU
  -- -----------    ---
2100 explorer    320.50
5300 pwsh         45.25
4240 notepad       1.25`,
          outputExplanation: [
            { label: "CPU", description: "The selected CPU property still represents total processor seconds. An older process may rank higher simply because it has been running longer." },
            { label: "Id / ProcessName", description: "Select-Object keeps these properties alongside CPU, so the ranked measurements remain associated with identifiable processes. The pipeline passes objects, not these formatted text rows." },
          ],
        },
      ],
      relatedCommands: [
        { name: "ipconfig", environment: "cmd", slug: "ipconfig", description: "If an application is running but cannot connect, inspect local network configuration as a separate troubleshooting step." },
      ],
    },
  },

  {
    name: "ls",
    slug: "ls",
    description:
      "List files and directories within the current Linux directory.",
    environment: "bash",
    categories: ["files"],
    difficulty: "beginner",
    details: {
      overview:
        "ls shows directory entries and file information on Linux. Use it to locate a configuration file, inspect ownership and permissions, or compare file sizes before troubleshooting an application. With no path it lists the current directory; dot-prefixed names are hidden by default. Options can be combined, so -la means -l plus -a. Brackets below indicate optional parts, and ... means you may supply more than one option or path. These examples illustrate GNU ls with ordinary files, invented owner/group labels and recent timestamps. Layout, colours, sorting and date formatting can vary with terminal settings and locale.",
      syntax: [
        { text: "ls", type: "command" },
        { text: " ", type: "plain" },
        { text: "[options]...", type: "option" },
        { text: " ", type: "plain" },
        { text: "[path]...", type: "path" },
      ],
      options: [
        { option: "-l", description: "Use a long listing to inspect permissions, link count, owner, group, size and modification time alongside each name.", example: "ls -l" },
        { option: "-a", description: "Include dot-prefixed entries, including . (the current directory) and .. (its parent). Useful for finding hidden configuration files.", example: "ls -la" },
        { option: "-h", description: "With -l, display sizes in readable units such as K and M using powers of 1024. It does not add size information to a plain name-only listing.", example: "ls -lh" },
        { option: "-R", description: "List subdirectories recursively. Start with a small, known directory: large trees produce lengthy output, and inaccessible subdirectories can report errors.", example: "ls -R ./project" },
      ],
      examples: [
        {
          title: "List the current directory",
          description: "See visible names before choosing a file to inspect. This is one possible terminal column layout; plain ls does not show permissions or hidden entries.",
          command: [{ text: "ls", type: "command" }],
          output: "notes.txt  project  script.sh",
          outputExplanation: [
            { label: "project", description: "A name alone does not tell you whether this is a directory. Use -l to see the entry type rather than relying on terminal colours." },
          ],
        },
        {
          title: "Inspect long-format and hidden entries",
          description: "Combine -l and -a to inspect a small example directory, including .settings. The owner learner and group training are fictional labels.",
          command: [
            { text: "ls", type: "command" },
            { text: " ", type: "plain" },
            { text: "-la", type: "option" },
          ],
          output: `total 20
drwxr-xr-x 2 learner training 4096 Sep 25 09:30 .
drwxr-xr-x 3 learner training 4096 Sep 25 09:00 ..
-rw------- 1 learner training   64 Sep 25 09:10 .settings
-rw-r--r-- 1 learner training 1200 Sep 25 09:15 notes.txt
-rwxr-xr-x 1 learner training  256 Sep 25 09:20 script.sh`,
          outputExplanation: [
            { label: "-rwxr-xr-x", description: "The first character is the type: - for a regular file, d for a directory. The next three triplets are owner, group and others permissions. r means read, w write, x execute (directory traversal for directories), and - means that permission is absent." },
            { label: "1 learner training", description: "1 is the hard-link count for this file, followed by the owner and group names. Directory link counts have different filesystem-dependent conventions." },
            { label: "256", description: "The file's logical size in bytes in this default long listing. A directory's displayed size describes its own directory data, not the sum of everything inside it." },
            { label: "Sep 25 09:20", description: "The modification time, not necessarily the creation time. Older timestamps commonly show a year instead of a time of day." },
            { label: "script.sh", description: "The entry name. A dot-prefixed name such as .settings is included because -a was used." },
            { label: "total 20", description: "Allocated storage for the listed entries, normally in 1 KiB blocks for GNU ls. It is not a file count or necessarily the sum of logical sizes; block-size settings can change its units." },
          ],
        },
        {
          title: "Read file sizes more easily",
          description: "Use -lh when reviewing a folder containing files of different sizes. This separate example folder contains a small text file and an archive.",
          command: [
            { text: "ls", type: "command" },
            { text: " ", type: "plain" },
            { text: "-lh", type: "option" },
          ],
          output: `total 2.1M
-rw-r--r-- 1 learner training 2.0M Sep 25 09:10 archive.tar
-rw-r--r-- 1 learner training 1.2K Sep 25 09:15 notes.txt`,
          outputExplanation: [
            { label: "2.0M / 1.2K", description: "Readable, rounded logical sizes: M represents MiB and K represents KiB here. The allocated-storage total can differ from the visible file sizes." },
          ],
        },
        {
          title: "List a specified directory",
          description: "Inspect ./project without changing the shell's current directory. The path is relative to where you are now; quote a path if it contains spaces.",
          command: [
            { text: "ls", type: "command" },
            { text: " ", type: "plain" },
            { text: "./project", type: "path" },
          ],
          output: "README.txt  scripts",
          outputExplanation: [
            { label: "README.txt  scripts", description: "These are entries inside project. Supplying a directory normally lists its contents, whereas supplying a regular file lists that file." },
          ],
        },
        {
          title: "Explore a small directory tree",
          description: "Use -R to see the project directory and its scripts subdirectory. Hidden names remain omitted unless you also use -a.",
          command: [
            { text: "ls", type: "command" },
            { text: " ", type: "plain" },
            { text: "-R", type: "option" },
            { text: " ", type: "plain" },
            { text: "./project", type: "path" },
          ],
          output: `./project:
README.txt  scripts

./project/scripts:
check.sh`,
          outputExplanation: [
            { label: "./project/scripts:", description: "Each heading identifies the directory whose entries follow. Recursive listing observes files; it does not change their permissions." },
          ],
        },
      ],
      relatedCommands: [
        { name: "chmod", environment: "bash", slug: "chmod", description: "Adjust file permissions after inspecting the current mode with ls -l." },
      ],
    },
  },

  {
    name: "chmod",
    slug: "chmod",
    description:
      "Change file and directory permissions on Linux systems.",
    environment: "bash",
    categories: ["files", "users"],
    difficulty: "intermediate",
    details: {
      overview:
        "chmod changes Linux file and directory permission bits. Use it to make your own script executable or correct an overly broad permission setting. It does not change ownership, and normally you must own the file or have appropriate privileges. Symbolic modes name the affected class: u is the owner (user), g the group, o others, and a all three. For regular files, r permits reading, w writing and x execution. For directories, r lists names, x permits traversal, and w together with x allows entry creation or removal. Successful chmod normally prints nothing; errors still need attention. Inspect the target and its current permissions with ls -l first. These examples assume ordinary files you own, without special mode bits or ACLs; such extra controls can also affect access.",
      syntax: [
        { text: "chmod", type: "command" },
        { text: " ", type: "plain" },
        { text: "[options]", type: "option" },
        { text: " ", type: "plain" },
        { text: "<mode>", type: "argument" },
        { text: " ", type: "plain" },
        { text: "<path>...", type: "path" },
      ],
      options: [
        { option: "u, g, o, a", description: "These are mode selectors, not command flags: owner, group, others, or all classes. Explicitly name the class you intend to change.", example: "chmod u+x script.sh" },
        { option: "+, -, =", description: "Symbolic mode operators add, remove or set permissions for the selected class. u+x preserves its other bits; g-w removes group write; o= removes all ordinary permissions for others.", example: "chmod g-w filename" },
        { option: "r = 4, w = 2, x = 1", description: "Numeric modes add these values separately for owner, group and others. 7 = 4+2+1 (rwx), 5 = 4+1 (r-x), 6 = 4+2 (rw-), and 0 grants none. A three-digit octal mode sets the ordinary permission bits rather than adding to them.", example: "chmod 755 script.sh" },
        { option: "-R", description: "Apply changes to the named directory and its descendants. Confirm the exact target and intended access first: a mistake can affect many files or disrupt an application. Do not use a broad system path as a practice target.", example: "chmod -R o-w ./project" },
      ],
      examples: [
        {
          title: "Add execution permission for the owner",
          description: "chmod u+x script.sh adds only the owner's execute bit and leaves other ordinary permissions unchanged. If this file starts at 644, it becomes 744 (rwxr--r--). No success text is expected. Making a script executable does not fix an invalid interpreter line or a filesystem mounted with noexec.",
          command: [
            { text: "chmod", type: "command" },
            { text: " ", type: "plain" },
            { text: "u+x", type: "argument" },
            { text: " ", type: "plain" },
            { text: "script.sh", type: "path" },
          ],
        },
        {
          title: "Set a script to 755",
          description: "Use this only when the script should be readable and executable by everyone. The owner gets 7 (rwx), the group 5 (r-x), and others 5 (r-x); only the owner gets write permission. This replaces the ordinary permission bits, so it can broaden access compared with a private script. Success normally produces no output.",
          command: [
            { text: "chmod", type: "command" },
            { text: " ", type: "plain" },
            { text: "755", type: "argument" },
            { text: " ", type: "plain" },
            { text: "script.sh", type: "path" },
          ],
        },
        {
          title: "Set a regular document to 644",
          description: "For a non-sensitive regular file named filename, 644 gives the owner read/write (6) and gives group and others read only (4). Nobody gets execute permission. This is unsuitable for private information that others must not read, and applying it to a directory removes traversal permission. Success normally produces no output.",
          command: [
            { text: "chmod", type: "command" },
            { text: " ", type: "plain" },
            { text: "644", type: "argument" },
            { text: " ", type: "plain" },
            { text: "filename", type: "path" },
          ],
        },
        {
          title: "Remove others' write access from a small project",
          description: "After inspecting a small project tree you own, use -R o-w to remove only the others-write bit from the real ./project directory and its descendants. Owner/group permissions and execute bits are unchanged. Confirm this access change is intended for every entry; it can break workflows that rely on others writing. Avoid symlink targets and do not substitute / or a system directory. Success normally produces no output; errors can mean only part of the tree was changed, so inspect the result.",
          command: [
            { text: "chmod", type: "command" },
            { text: " ", type: "plain" },
            { text: "-R", type: "option" },
            { text: " ", type: "plain" },
            { text: "o-w", type: "argument" },
            { text: " ", type: "plain" },
            { text: "./project", type: "path" },
          ],
        },
        {
          title: "Check the script's permissions afterwards",
          description: "Run this separate ls command after the 755 example. The output comes from ls, not chmod. This illustrative row uses an invented owner/group and assumes a regular file without additional access-control markers.",
          command: [
            { text: "ls", type: "command" },
            { text: " ", type: "plain" },
            { text: "-l", type: "option" },
            { text: " ", type: "plain" },
            { text: "script.sh", type: "path" },
          ],
          output: "-rwxr-xr-x 1 learner training 256 Sep 25 09:20 script.sh",
          outputExplanation: [
            { label: "-rwxr-xr-x", description: "The leading - identifies a regular file. The triplets rwx, r-x and r-x correspond to 7, 5 and 5 for owner, group and others." },
            { label: "learner training", description: "The owner and group determine which permission classes apply. chmod changed mode bits, not these names." },
          ],
        },
      ],
      relatedCommands: [
        { name: "ls", environment: "bash", slug: "ls", description: "Inspect ownership and permission bits before and after a chmod change." },
      ],
    },
  },
];

export function getCommand(environment: string, slug: string): Command | undefined {
  return commands.find(
    (command) => command.environment === environment && command.slug === slug,
  );
}
