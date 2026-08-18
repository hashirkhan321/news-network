import type { Article } from "./types";
import { hoursAgo } from "./utils";

/* =========================================================================
   DATA LAYER
   This is a mock data source so the project runs standalone with no
   external dependencies or API keys. To connect a real feed later,
   replace `fetchArticles()` below with a call to a news API or an
   RSS-to-JSON service and map the response into the `Article` shape
   defined in src/types.ts. The rest of the app only depends on that
   shape, so no other file needs to change.

   Example:
   export async function fetchArticles(): Promise<Article[]> {
     const res = await fetch(
       `${import.meta.env.VITE_NEWS_API_BASE_URL}/top-headlines?apiKey=${import.meta.env.VITE_NEWS_API_KEY}`
     );
     const json = await res.json();
     return json.articles.map(mapApiItemToNewsNetworkShape);
   }
   ========================================================================= */

export const MOCK_ARTICLES: Article[] = [
  {
    id: 1,
    slug: "regional-powers-security-framework",
    category: "World",
    tags: ["Geopolitics"],
    headline:
      "Regional Powers Reach Preliminary Framework After Marathon Security Talks",
    subheadline:
      "Negotiators describe the draft agreement as a first step toward de-escalation, though key disputes remain unresolved.",
    summary:
      "After four days of closed-door negotiations, delegations from the region's largest economies say they have agreed on a framework intended to reduce the risk of miscalculation along contested frontiers.",
    body: [
      "Delegations from across the region emerged from a fourth consecutive day of closed-door talks late Sunday with what mediators are calling a 'preliminary framework' for reducing military tension along several long-disputed borders.",
      "The draft, which has not been made public in full, reportedly includes a mutual notification system for large-scale troop movements and a hotline between military commands intended to prevent accidental escalation.",
      "Several analysts cautioned that framework agreements of this kind have collapsed before at the implementation stage, when domestic political pressures reassert themselves.",
      "Officials from three of the participating states are expected to brief their respective legislatures this week, with a formal signing ceremony tentatively planned for next month pending final language on verification mechanisms.",
      "Markets in the region responded cautiously, with regional currencies posting modest gains against the dollar in early trading following the announcement.",
    ],
    author: "Aisha Raza",
    authorTitle: "World Desk",
    publishedAt: hoursAgo(2),
    updatedAt: hoursAgo(1),
    breaking: true,
    trendingRank: 1,
  },
  {
    id: 2,
    slug: "un-envoy-humanitarian-crisis-border",
    category: "World",
    tags: ["Geopolitics"],
    headline:
      "UN Envoy Warns of Deepening Humanitarian Crisis Along Contested Border",
    subheadline:
      "Aid agencies say displacement figures have tripled in six weeks as access corridors remain restricted.",
    summary:
      "A senior United Nations envoy told reporters that humanitarian access has narrowed sharply even as the number of displaced families continues to climb, calling for an immediate corridor agreement.",
    body: [
      "Speaking from a regional coordination hub, the envoy said that humanitarian access to affected areas had 'narrowed dramatically' over the past six weeks even as displacement figures roughly tripled.",
      "Aid organizations operating in the area report that clean water and basic medical supplies are running critically low in several makeshift settlements.",
      "The envoy called on all parties to agree to a temporary humanitarian corridor, warning that the coming weeks would be decisive for preventing a broader public health emergency.",
      "Donor governments have pledged additional emergency funding, though logistics coordinators say the larger obstacle remains safe passage rather than available supplies.",
    ],
    author: "Marcus Ferreira",
    authorTitle: "International Correspondent",
    publishedAt: hoursAgo(6),
    updatedAt: hoursAgo(5),
    breaking: false,
    trendingRank: 3,
  },
  {
    id: 3,
    slug: "islamabad-economic-reform-package-imf",
    category: "Pakistan",
    tags: [],
    headline: "Islamabad Unveils New Economic Reform Package Amid IMF Talks",
    subheadline:
      "The package includes tax administration changes and energy-sector restructuring aimed at satisfying loan-review benchmarks.",
    summary:
      "The federal government has announced a package of fiscal reforms it says will strengthen its position ahead of the next review round with the International Monetary Fund.",
    body: [
      "The finance ministry on Sunday announced a package of measures aimed at broadening the tax base and restructuring loss-making state utilities, framing the move as central to upcoming loan-review discussions.",
      "Officials said the plan includes stricter enforcement against under-reported retail income and a phased restructuring of power-sector debt that has weighed on the national budget for years.",
      "Business chambers offered a mixed response, welcoming the predictability of a clearer reform timeline while raising concerns about the pace of new compliance requirements for small traders.",
      "Independent economists said the package addresses several long-standing structural issues but noted that implementation, not announcement, has historically been the harder test for similar reform efforts.",
      "A review mission is expected to visit in the coming weeks to assess progress against agreed benchmarks.",
    ],
    author: "Hassan Bukhari",
    authorTitle: "Economy Desk, Islamabad",
    publishedAt: hoursAgo(3),
    updatedAt: hoursAgo(3),
    breaking: true,
    trendingRank: null,
  },
  {
    id: 4,
    slug: "monsoon-floods-southern-punjab",
    category: "Pakistan",
    tags: [],
    headline: "Monsoon Floods Displace Thousands in Southern Punjab",
    subheadline:
      "Relief camps are being expanded as authorities warn river levels may rise further this week.",
    summary:
      "Heavy monsoon rains have forced thousands of families from low-lying villages in southern Punjab, prompting an expansion of relief operations along the affected districts.",
    body: [
      "Continuous monsoon rainfall over the past several days has pushed river levels close to danger marks in parts of southern Punjab, forcing the evacuation of low-lying villages.",
      "Provincial disaster management officials said relief camps have been set up in nearby towns and that boats and medical teams have been deployed to reach cut-off communities.",
      "Farmers in the region report significant crop damage, raising concerns about food prices in local markets in the weeks ahead.",
      "The meteorological department has forecast further rainfall through the week and urged residents in vulnerable areas to move to higher ground as a precaution.",
    ],
    author: "Sana Farooqi",
    authorTitle: "Staff Reporter",
    publishedAt: hoursAgo(9),
    updatedAt: hoursAgo(4),
    breaking: false,
    trendingRank: 2,
  },
  {
    id: 5,
    slug: "lawmakers-energy-policy-overhaul",
    category: "Politics",
    tags: [],
    headline: "Lawmakers Clash Over Sweeping Energy Policy Overhaul",
    subheadline:
      "The bill would restructure subsidies and accelerate permitting for new power projects.",
    summary:
      "A contentious energy policy bill cleared its first committee vote after hours of debate, with lawmakers sharply divided over subsidy changes and permitting timelines.",
    body: [
      "The proposed legislation, which would restructure long-standing energy subsidies and streamline permitting for new generation capacity, advanced out of committee after an unusually long session.",
      "Supporters argue the changes are overdue and necessary to attract private investment in grid modernization.",
      "Critics counter that the subsidy changes could raise costs for lower-income households in the short term, and have called for a phased transition instead.",
      "The bill now heads to a full floor vote, with leadership signaling they hope to reach a resolution before the current legislative session closes.",
    ],
    author: "Daniel Whitfield",
    authorTitle: "Political Correspondent",
    publishedAt: hoursAgo(11),
    updatedAt: hoursAgo(11),
    breaking: false,
    trendingRank: null,
  },
  {
    id: 6,
    slug: "opposition-snap-elections-coalition-rift",
    category: "Politics",
    tags: [],
    headline: "Opposition Calls for Snap Elections Following Coalition Rift",
    subheadline:
      "A junior coalition partner's withdrawal has left the governing majority narrower than at any point this term.",
    summary:
      "Opposition leaders renewed calls for early elections after a smaller coalition partner withdrew its support, leaving the governing bloc with a significantly reduced majority.",
    body: [
      "The governing coalition's majority narrowed sharply this week after a junior partner formally withdrew support over disagreements on regional spending allocations.",
      "Opposition figures argued the shift undermines the government's mandate and renewed calls for early elections, though the ruling party has dismissed the demand as premature.",
      "Constitutional scholars note that the government retains a technical majority for now, but that passing contested legislation will likely require new negotiations with independent lawmakers.",
    ],
    author: "Daniel Whitfield",
    authorTitle: "Political Correspondent",
    publishedAt: hoursAgo(15),
    updatedAt: hoursAgo(15),
    breaking: false,
    trendingRank: null,
  },
  {
    id: 7,
    slug: "global-markets-rally-rate-pause",
    category: "Business",
    tags: [],
    headline: "Global Markets Rally as Central Banks Signal Rate Pause",
    subheadline:
      "Major indices posted their strongest week in months after policymakers hinted at a pause in tightening.",
    summary:
      "Stocks rallied worldwide after several central banks signaled they may pause further rate increases, easing investor concerns about the pace of monetary tightening.",
    body: [
      "Equity markets across Asia, Europe and North America extended gains Monday after policymakers at two major central banks signaled openness to pausing further rate increases.",
      "Bond yields eased on the news, and analysts said the shift in tone reflects growing confidence that inflation is cooling toward target ranges.",
      "Corporate treasurers welcomed the reprieve, noting that borrowing costs have weighed heavily on expansion plans over the past two years.",
      "Some economists cautioned against reading too much into a single week of commentary, noting that policy paths remain highly dependent on incoming data.",
    ],
    author: "Priya Nandakumar",
    authorTitle: "Markets Correspondent",
    publishedAt: hoursAgo(4),
    updatedAt: hoursAgo(2),
    breaking: true,
    trendingRank: null,
  },
  {
    id: 8,
    slug: "tech-giant-record-earnings-concentration-debate",
    category: "Business",
    tags: ["Technology"],
    headline:
      "Tech Giant's Record Earnings Fuel Debate Over Market Concentration",
    subheadline:
      "The results reignited scrutiny of dominant platforms as regulators weigh new competition rules.",
    summary:
      "A leading technology company reported record quarterly profit, results that analysts say will intensify ongoing debates over market concentration and platform regulation.",
    body: [
      "The company reported quarterly profit well above analyst expectations, driven largely by growth in its cloud and advertising divisions.",
      "The results landed amid an active regulatory debate over the market power of large platform companies, and several lawmakers cited the earnings as evidence supporting tighter oversight.",
      "Company executives defended their scale as a driver of innovation and lower consumer prices, pointing to continued investment in smaller competitors and open developer tools.",
      "Shares rose in after-hours trading following the announcement.",
    ],
    author: "Priya Nandakumar",
    authorTitle: "Markets Correspondent",
    publishedAt: hoursAgo(20),
    updatedAt: hoursAgo(18),
    breaking: false,
    trendingRank: null,
  },
  {
    id: 9,
    slug: "ai-chip-shortage-semiconductor-supply-chains",
    category: "Technology",
    tags: ["Business"],
    headline: "AI Chip Shortage Reshapes Global Semiconductor Supply Chains",
    subheadline:
      "Manufacturers are racing to diversify production as demand for specialized processors outpaces supply.",
    summary:
      "Persistent shortages of advanced chips used in artificial intelligence systems are pushing manufacturers to diversify production across new regions, reshaping the global semiconductor map.",
    body: [
      "Demand for specialized processors used in artificial intelligence workloads continues to outstrip supply, prompting chipmakers to accelerate plans for new fabrication facilities in multiple regions.",
      "Industry analysts say the shortage has become a strategic priority for governments as well as companies, with several announcing incentive packages to attract new plants.",
      "Smaller AI startups say the scarcity has made access to computing capacity, rather than access to capital, their primary growth constraint.",
      "Analysts expect supply to gradually ease as new capacity comes online over the next two years, though near-term shortages are likely to persist.",
    ],
    author: "Wei Chen",
    authorTitle: "Technology Correspondent",
    publishedAt: hoursAgo(7),
    updatedAt: hoursAgo(7),
    breaking: false,
    trendingRank: 4,
  },
  {
    id: 10,
    slug: "startup-battery-storage-breakthrough",
    category: "Technology",
    tags: [],
    headline: "Startup Unveils Breakthrough in Battery Storage Technology",
    subheadline:
      "The company says its new cell chemistry could cut charging times significantly while improving longevity.",
    summary:
      "A battery technology startup unveiled a new cell chemistry it says can substantially reduce charging times while extending overall battery lifespan.",
    body: [
      "The startup said its new cell design uses a modified electrode structure that allows for faster ion transport without the degradation typically associated with rapid charging.",
      "Independent battery researchers said the early results appear promising but stressed that lab performance often differs from results at commercial scale.",
      "The company plans to begin pilot production with an automotive partner next year, with wider deployment dependent on how the technology performs in real-world testing.",
    ],
    author: "Wei Chen",
    authorTitle: "Technology Correspondent",
    publishedAt: hoursAgo(26),
    updatedAt: hoursAgo(26),
    breaking: false,
    trendingRank: null,
  },
  {
    id: 11,
    slug: "underdog-championship-final-upset",
    category: "Sports",
    tags: [],
    headline: "Underdog Squad Stuns Favorites in Dramatic Championship Final",
    subheadline:
      "A last-minute goal capped a remarkable run for a team that entered the tournament as a long-shot.",
    summary:
      "In one of the tournament's biggest upsets in years, the underdog squad defeated the heavily favored defending champions in a dramatic final decided in the closing minutes.",
    body: [
      "The underdog side, which entered the tournament as one of the lowest-ranked qualifiers, completed a remarkable run by defeating the defending champions in Sunday's final.",
      "A stoppage-time goal sealed the win, sending the team's supporters into celebration and capping what analysts are already calling one of the tournament's most memorable finals.",
      "The winning coach credited a disciplined defensive gameplan and squad depth for the result, while the runners-up said they would use the loss as motivation heading into next season.",
    ],
    author: "Omar Siddiqui",
    authorTitle: "Sports Desk",
    publishedAt: hoursAgo(10),
    updatedAt: hoursAgo(10),
    breaking: false,
    trendingRank: 5,
  },
  {
    id: 12,
    slug: "star-athlete-injury-season-outlook",
    category: "Sports",
    tags: [],
    headline: "Star Athlete's Injury Casts Shadow Over Upcoming Season",
    subheadline: "The team says initial scans point to a multi-week recovery timeline.",
    summary:
      "One of the league's most closely watched athletes will be sidelined for several weeks after sustaining an injury in training, the team confirmed Monday.",
    body: [
      "The team confirmed that its star player will miss several weeks of the upcoming season after sustaining an injury during a training session.",
      "Medical staff said initial scans were encouraging but recommended a full recovery period before any return-to-play decision is made.",
      "Coaches said the squad's depth would be tested early in the season, with several younger players expected to see increased playing time.",
    ],
    author: "Omar Siddiqui",
    authorTitle: "Sports Desk",
    publishedAt: hoursAgo(30),
    updatedAt: hoursAgo(29),
    breaking: false,
    trendingRank: null,
  },
  {
    id: 13,
    slug: "clean-fusion-experiment-results",
    category: "Science",
    tags: [],
    headline: "Researchers Report Promising Results in Clean Fusion Experiment",
    subheadline: "The team says its reactor sustained a stable reaction for longer than in previous trials.",
    summary:
      "A research consortium reported that its experimental fusion reactor sustained a stable reaction for significantly longer than in earlier trials, a milestone researchers called encouraging but early-stage.",
    body: [
      "The research team said its experimental reactor sustained a stable fusion reaction for a notably longer duration than in previous test runs, a result they described as an encouraging step rather than a breakthrough.",
      "Independent physicists welcomed the progress while cautioning that commercially viable fusion power likely remains years away.",
      "The team plans further trials aimed at improving energy output relative to the input required to sustain the reaction.",
    ],
    author: "Dr. Leila Amiri",
    authorTitle: "Science Correspondent",
    publishedAt: hoursAgo(34),
    updatedAt: hoursAgo(34),
    breaking: false,
    trendingRank: null,
  },
  {
    id: 14,
    slug: "astronomers-water-signs-exoplanet",
    category: "Science",
    tags: [],
    headline: "Astronomers Detect Signs of Water on Distant Exoplanet",
    subheadline: "The findings, drawn from spectral analysis, add to a growing list of potentially habitable worlds.",
    summary:
      "Astronomers analyzing light passing through a distant exoplanet's atmosphere say they have detected chemical signatures consistent with water vapor, adding the planet to a growing list of habitability candidates.",
    body: [
      "Using spectral data collected during the planet's transit across its host star, researchers identified chemical signatures consistent with the presence of water vapor in its atmosphere.",
      "The planet, located several hundred light-years away, joins a small but growing list of worlds considered potentially habitable based on atmospheric composition and orbital distance from their star.",
      "The team said follow-up observations would be needed to confirm the findings and to rule out alternative explanations for the spectral pattern.",
    ],
    author: "Dr. Leila Amiri",
    authorTitle: "Science Correspondent",
    publishedAt: hoursAgo(40),
    updatedAt: hoursAgo(40),
    breaking: false,
    trendingRank: null,
  },
  {
    id: 15,
    slug: "streaming-platforms-battle-series-rights",
    category: "Entertainment",
    tags: [],
    headline: "Streaming Platforms Battle for Rights to Award-Winning Series",
    subheadline: "Bidding for the show's next season is reported to have reached a record figure for a single series.",
    summary:
      "Several major streaming platforms are reportedly competing for the rights to an award-winning series' upcoming season, with industry sources describing the bidding as unusually intense.",
    body: [
      "Industry sources say bidding among streaming platforms for the rights to the acclaimed series' next season has reached figures rarely seen for a single show.",
      "The competition reflects a broader shift among platforms toward fewer, higher-profile titles intended to anchor subscriber growth.",
      "A decision is expected within weeks, according to people familiar with the negotiations.",
    ],
    author: "Farah Iqbal",
    authorTitle: "Entertainment Desk",
    publishedAt: hoursAgo(16),
    updatedAt: hoursAgo(16),
    breaking: false,
    trendingRank: null,
  },
  {
    id: 16,
    slug: "naval-buildup-contested-waters",
    category: "World",
    tags: ["Geopolitics"],
    headline: "Naval Buildup in Contested Waters Raises Alarm Among Neighboring States",
    subheadline: "Satellite imagery reviewed by analysts shows a notable increase in vessel activity over the past month.",
    summary:
      "A marked increase in naval activity in a long-contested maritime zone has prompted concern from neighboring states, with several calling for restraint and renewed diplomatic dialogue.",
    body: [
      "Satellite imagery reviewed by independent analysts shows a marked increase in naval vessel activity in a long-disputed maritime zone over the past month.",
      "Several neighboring states issued statements calling for restraint, while regional security officials said they were monitoring the situation closely.",
      "Diplomats familiar with the matter said backchannel talks aimed at reducing tensions were ongoing, though no formal talks have been scheduled.",
      "Shipping industry groups said commercial traffic through the area had not yet been significantly affected but were watching developments closely.",
    ],
    author: "Marcus Ferreira",
    authorTitle: "International Correspondent",
    publishedAt: hoursAgo(1),
    updatedAt: hoursAgo(1),
    breaking: true,
    trendingRank: null,
  },
];

export async function fetchArticles(): Promise<Article[]> {
  // Swap this resolved promise for a real fetch() call when a live
  // API key or RSS source is available. The rest of the app only
  // depends on the shape of the returned array, defined in src/types.ts.
  return Promise.resolve(MOCK_ARTICLES);
}
