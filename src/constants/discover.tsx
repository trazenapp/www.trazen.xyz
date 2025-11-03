export const discoverItems = [
  // Chains
  { name: "Solana", type: "CHAIN", url: "/solana" },
  { name: "Ethereum", type: "CHAIN", url: "/ethereum" },
  { name: "Polygon", type: "CHAIN", url: "/polygon" },
  { name: "Polkadot", type: "CHAIN", url: "/polkadot" },
  { name: "Binance Smart Chain (BSC)", type: "CHAIN", url: "/bsc" },
  { name: "Sui", type: "CHAIN", url: "/sui" },
  { name: "Cosmos", type: "CHAIN", url: "/cosmos" },
  { name: "Avalanche", type: "CHAIN", url: "/avalanche" },
  { name: "Arbitrum", type: "CHAIN", url: "/arbitrum" },
  { name: "zkSync", type: "CHAIN", url: "/zksync" },
  { name: "Cardano", type: "CHAIN", url: "/cardano" },
  { name: "Tezos", type: "CHAIN", url: "/tezos" },

  // Niches
  { name: "NFTs", type: "NICHE", url: "/nfts" },
  { name: "DeFi", type: "NICHE", url: "/defi" },
  { name: "DAOs", type: "NICHE", url: "/daos" },
  { name: "Metaverse", type: "NICHE", url: "/metaverse" },
  { name: "SocialFi", type: "NICHE", url: "/socialfi" },
  { name: "Gaming", type: "NICHE", url: "/gaming" },
  {
    name: "Decentralized Identity",
    type: "NICHE",
    url: "/decentralized-identity",
  },
  { name: "RWAs", type: "NICHE", url: "/rwas" },
  {
    name: "Decentralized Infrastructures",
    type: "NICHE",
    url: "/decentralized-infrastructures",
  },

  // Roles
  {
    name: "Smart Contract Development",
    type: "ROLE",
    url: "/smart-contract-development",
  },
  { name: "Security & Auditing", type: "ROLE", url: "/security-auditing" },
  {
    name: "Community Building & Management",
    type: "ROLE",
    url: "/community-management",
  },
  { name: "Content Creation", type: "ROLE", url: "/content-creation" },
  { name: "UI/UX Design", type: "ROLE", url: "/ui-ux-design" },
  { name: "Front end developer", type: "ROLE", url: "/frontend-developer" },
  { name: "Backend developer", type: "ROLE", url: "/backend-developer" },
  { name: "Graphic designer", type: "ROLE", url: "/graphic-designer" },
  { name: "Project manager", type: "ROLE", url: "/project-manager" },
  { name: "Marketer", type: "ROLE", url: "/marketer" },

  // Popular Projects
  { name: "Uniswap", type: "PROJECT", url: "/uniswap" },
  { name: "Zerion", type: "PROJECT", url: "/zerion" },
  { name: "Sonic", type: "PROJECT", url: "/sonic" },
  { name: "Opensea", type: "PROJECT", url: "/opensea" },
  { name: "Sushiswap", type: "PROJECT", url: "/sushiswap" },
];

export const Chains = discoverItems
  .filter((item) => item.type === "CHAIN")
  .sort((a, b) => a.name.localeCompare(b.name));
export const Niches = discoverItems
  .filter((item) => item.type === "NICHE")
  .sort((a, b) => a.name.localeCompare(b.name));
