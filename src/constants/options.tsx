export interface OptionType {
  value: string;
  label: string;
}

export const options: OptionType[] = [
  { value: "Smart Contract Development", label: "Smart Contract Development" },
  {
    value: "Decentralized Applications (dApps)",
    label: "Decentralized Applications (dApps)",
  }, // Web3
  { value: "Blockchain Fundamentals", label: "Blockchain Fundamentals" }, // Web3
  { value: "Ethereum", label: "Ethereum" }, // Web3
  { value: "IPFS", label: "IPFS" }, // Web3
  { value: "Truffle/Hardhat", label: "Truffle/Hardhat" }, // Web3
  { value: "Web3.js/Ethers.js", label: "Web3.js/Ethers.js" }, // Web3
  { value: "Solidity", label: "Solidity" }, // Web3
  { value: "React", label: "React" },
  { value: "Vue.js", label: "Vue.js" },
  { value: "Angular", label: "Angular" },
  { value: "HTML5", label: "HTML5" },
  { value: "CSS3", label: "CSS3" },
  { value: "Tailwind CSS", label: "Tailwind CSS" },
  { value: "Responsive Design", label: "Responsive Design" },
  { value: "Node.js", label: "Node.js" },
  { value: "Express.js", label: "Express.js" },
  { value: "Django", label: "Django" },
  { value: "Flask", label: "Flask" },
  { value: "RESTful APIs", label: "RESTful APIs" },
  { value: "GraphQL", label: "GraphQL" },
  { value: "SQL (PostgreSQL, MySQL)", label: "SQL (PostgreSQL, MySQL)" },
  { value: "NoSQL (MongoDB, Cassandra)", label: "NoSQL (MongoDB, Cassandra)" },
  { value: "Redis", label: "Redis" },
  { value: "Docker", label: "Docker" },
  { value: "Kubernetes", label: "Kubernetes" },
  { value: "AWS", label: "AWS" },
  { value: "Azure", label: "Azure" },
  {
    value: "Google Cloud Platform (GCP)",
    label: "Google Cloud Platform (GCP)",
  },
  { value: "CI/CD", label: "CI/CD" },
  { value: "Problem Solving", label: "Problem Solving" },
  { value: "Unit Testing", label: "Unit Testing" },
  { value: "Git/GitHub", label: "Git/GitHub" },
  {
    value: "Data Structures & Algorithms",
    label: "Data Structures & Algorithms",
  },
  { value: "Problem Solving", label: "Problem Solving" },
  { value: "Unit Testing", label: "Unit Testing" },
  { value: "Version Control", label: "Version Control" },
  { value: "Other", label: "Other" },
];

export const hearOptions = [
  { value: "Google", label: "Google" },
  { value: "Twitter", label: "Twitter" },
  { value: "Discord", label: "Discord" },
  { value: "Word of Mouth", label: "Word of Mouth" },
  { value: "Others", label: "Others" },
];

export const chainOptions = [
  { value: "Ethereum", label: "Ethereum" },
  { value: "Polygon", label: "Polygon" },
  { value: "Solana", label: "Solana" },
  { value: "Polkadot", label: "Polkadot" },
  { value: "Binance Smart Chain", label: "Binance Smart Chain" },
  { value: "Sui", label: "Sui" },
  { value: "Cosmos", label: "Cosmos" },
  { value: "Avalanche", label: "Avalanche" },
  { value: "Arbitrum", label: "Arbitrum" },
  { value: "zkSync", label: "zkSync" },
  { value: "Cardano", label: "Cardano" },
  { value: "Tezos", label: "Tezos" },
];

export const nicheOptions = [
  { value: "NFT", label: "NFT" },
  { value: "DeFi", label: "DeFi" },
  { value: "DAOs", label: "DAOs" },
  { value: "Metaverse", label: "Metaverse" },
  { value: "SocialFi", label: "SocialFi" },
  { value: "Gaming", label: "Gaming" },
  { value: "Decentralized Identity", label: "Decentralized Identity" },
  { value: "RWAs", label: "RWAs" },
  {
    value: "Decentralized Infrastructure",
    label: "Decentralized Infrastructure",
  },
];

export const projectOptions = [
  { value: "Uniswap", label: "Uniswap" },
  { value: "Zerion", label: "Zerion" },
  { value: "Sonic", label: "Sonic" },
  { value: "Opensea", label: "Opensea" },
  { value: "Sushiswap", label: "Sushiswap" },
  { value: "Polygon", label: "Polygon" },
  { value: "Pancakeswap", label: "Pancakeswap" },
  { value: "Base", label: "Base" },
];

export const ChainAndNicheOptions = [...chainOptions, ...nicheOptions].sort(
  (a, b) => a.label.localeCompare(b.label)
);
