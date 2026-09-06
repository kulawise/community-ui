// Edit the values below to update what's shown on the community site.
// Numbers here are placeholders until real figures are available — keep them
// honest; drop a stat entirely rather than leave a fabricated number live.

export type NavLink = { label: string; href: string };

export const NAV_LINKS: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "Community Stories", href: "/stories" },
  { label: "Impact", href: "/impact" },
];

export const LIVE_IMPACT_STATS = [
  { value: "12", label: "Circles Launched" },
  { value: "5", label: "Cities Active" },
  { value: "85%", label: "Habit Consistency" },
];

export type SDGGoal = {
  goal: string;
  title: string;
  colorClass: string;
  icon: string;
  description: string;
};

// colorClass must be the full, literal "bg-sdg-..." string — Tailwind's
// scanner only generates CSS for class names it can find as literal text in
// source files. Deriving a class at runtime (e.g. via .replace()) means
// Tailwind never sees the resulting string and silently drops the style.
// Keep this list in sync with SDG_DETAIL_CARDS below — the home page teaser
// and the /impact page should always reference the same 4 goals.
export const SDG_TEASER_GOALS: SDGGoal[] = [
  {
    goal: "Goal 1",
    title: "No Poverty",
    colorClass: "bg-sdg-no-poverty",
    icon: "savings",
    description:
      "Building sustainable income pathways through helping wellness & health professionals monetize the value they provide.",
  },
  {
    goal: "Goal 3",
    title: "Good Health and Well-being",
    colorClass: "bg-sdg-good-health",
    icon: "favorite",
    description:
      "Our primary focus: helping members build daily habits that prevent illness before it starts.",
  },
  {
    goal: "Goal 12",
    title: "Responsible Consumption",
    colorClass: "bg-sdg-responsible-consumption",
    icon: "recycling",
    description:
      "Pantry-aware shopping lists that help members reduce over-purchasing and household food waste.",
  },
  {
    goal: "Goal 17",
    title: "Partnerships for the Goals",
    colorClass: "bg-sdg-partnerships",
    icon: "handshake",
    description:
      "Building partnerships with insurers and lenders so a verified habit record can unlock real financial benefits.",
  },
];

export type StoryCard = {
  id: string;
  category: string;
  categoryColorClass: string;
  icon: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  slug: string;
  date: "August 2026" | "July 2026" | "June 2026" | string;
  readTime: string;
  author: string;
  role: string;
  instagram?: string;
  posters?: string[];
};

export const STORY_CARDS: StoryCard[] = [
  {
    id: "emmanuel-amah-evaready",
    category: "Footballer & Consistency",
    categoryColorClass: "text-primary",
    icon: "sports_soccer",
    title: "Consistency Isn't Motivation, It's Showing Up: Meet Evaready",
    subtitle: "Some days motivation isn't there. You put on your headset, play your music, and walk anyway.",
    description:
      "How losing a loved one to diabetes turned Emmanuel \u201CEvaready\u201D Amah into a 20,000-steps-a-day walker chasing the top of the leaderboard.",
    image: "/images/amah-kulawise.jpeg",
    slug: "emmanuel-amah-evaready",
    date: "September 2026",
    readTime: "4 min read",
    author: "Emmanuel Amah",
    role: "Footballer",
    posters: [
      "/images/amah-kulawise.jpeg",
    ],
  },
  {
    id: "ifeoma-arua",
    category: "Runner & Discipline",
    categoryColorClass: "text-primary",
    icon: "directions_run",
    title: "From Burnout to the Leaderboard: Meet Ifeoma Arua",
    subtitle: "Finding my way back to myself through early morning movement, rain or shine.",
    description:
      "How Ifeoma turned early 4:30 AM mornings and rainy runs into a quiet journey back to herself and inspiring a community.",
    image: "/images/kulawise-community-story-ifeoma-arua-burnout-leaderboard.jpg",
    slug: "ifeoma-arua",
    date: "August 2026",
    readTime: "5 min read",
    author: "Ifeoma Arua",
    role: "Operations Professional & Runner",
    instagram: "@_bloomingbutterfly",
    posters: [
      "/images/kulawise-community-story-ifeoma-arua-burnout-leaderboard.jpg",
      "/images/kulawise-community-story-ifeoma-arua-the-beginning.jpg",
      "/images/kulawise-community-story-ifeoma-arua-the-discipline.jpg",
      "/images/kulawise-community-story-ifeoma-arua-the-community.jpg",
    ],
  },
  {
    id: "lagos-dietitian-women-wellness",
    category: "Nutrition & Business Growth",
    categoryColorClass: "text-sdg-good-health",
    icon: "restaurant",
    title: "Empowering Women in Lagos: How Kulawise Scaled a Dietitian's Community",
    subtitle: "From chasing monthly WhatsApp receipts to building a thriving subscription-based wellness circle for women.",
    description:
      "How a Lagos dietitian moved her women's weight loss and nutrition group off chaotic WhatsApp chats into Kulawise Circles to manage monthly subscriptions and double member retention.",
    image: "/images/close-up-people-kitchen.jpg",
    slug: "lagos-dietitian-women-wellness",
    date: "July 2026",
    readTime: "4 min read",
    author: "Kemi",
    role: "Clinical Dietitian & Women's Health Coach",
  },
];

export const DIETITIAN_STORY = {
  id: "lagos-dietitian-women-wellness",
  name: "Kemi",
  role: "Clinical Dietitian & Founder",
  title: "Empowering Women in Lagos: How Kulawise Scaled a Dietitian's Community",
  subtitle: "Moving past WhatsApp chaos to deliver high-impact nutrition coaching and hassle-free monthly subscriptions.",
  date: "July 2026",
  readTime: "4 min read",
  image: "/images/close-up-people-kitchen.jpg",
  questions: [
    {
      q: "1. Tell us about your work and community in Lagos.",
      a: `I'm Kemi, a registered dietitian based in Lagos. A few years ago, I founded a community dedicated to helping busy Nigerian women achieve sustainable weight loss, healthy meal planning, and metabolic health without restrictive diets or losing our local food culture.`
    },
    {
      q: "2. What challenges were you facing running your program on WhatsApp?",
      a: `Running a monthly subscription program on WhatsApp was pure chaos. Every month, I had to manually track bank transfers, chase screenshot proofs in DM threads, figure out whose subscription expired, and manually add or remove members. 

Half of my time was spent acting like an accountant instead of doing what I love — guiding women through their nutrition goals. Valuable meal plans and daily check-in messages got buried in noisy chat threads.`
    },
    {
      q: "3. How has switching to Kulawise transformed your business and community?",
      a: `Moving our community into a dedicated Kulawise Circle changed everything. 

First, subscription payments and renewals happen seamlessly in the background without me chasing single bank alerts. 

Second, the engagement level exploded. The women can log their daily water intake, meal photos, and active minutes right in the Circle. They compete on gentle weekly habit leaderboards, which keeps everyone motivated. My renewal rates jumped from 55% to over 88% in just two months because members actually see their progress and stay accountable.`
    },
    {
      q: "4. What advice do you have for other health professionals building communities?",
      a: `Focus on delivering real value, but don't let poor tools drain your energy. Your community members want structure, accountability, and a clean space to celebrate their wins. When you automate the payment and tracking headaches, you can spend 100% of your energy transforming lives.`
    }
  ],
  closing: `Kulawise gave me back hours every week while giving our women a home where healthy living feels like a shared, joyful journey.

Kemi`
};

export const IFEOMA_STORY = {
  id: "ifeoma-arua",
  name: "Ifeoma Arua",
  role: "Operations Professional & Runner",
  title: "From Burnout to the Leaderboard: A Story of Discipline, Rain or Shine",
  subtitle: "Finding my way back to myself through early morning movement, rain or shine.",
  instagram: "@_bloomingbutterfly",
  date: "August 2026",
  readTime: "5 min read",
  posters: [
    "/images/kulawise-community-story-ifeoma-arua-burnout-leaderboard.jpg",
    "/images/kulawise-community-story-ifeoma-arua-the-beginning.jpg",
    "/images/kulawise-community-story-ifeoma-arua-the-discipline.jpg",
    "/images/kulawise-community-story-ifeoma-arua-the-community.jpg",
  ],
  questions: [
    {
      q: "1. Tell us a little about yourself.",
      a: `My name is Ifeoma Arua - an Operations professional, a daughter, a sister, a reader, a specialty coffee lover and a barista, a creative, and, somewhere along the way, someone who became a runner and walker.

I’m naturally curious and enjoy learning, creating things, travelling, reading, having meaningful conversations, and building communities. I’ve spent a good part of my career working in operations and customer experience, so I genuinely enjoy bringing structure to things and seeing people and ideas grow.

But outside work, I’ve been learning to make more room for myself. Fitness has become a very important part of that. What started as exercise has become my quiet time, my thinking space, my discipline, and honestly, one of the things that keeps me grounded.`
    },
    {
      q: "2. What got you started on your health and fitness journey?",
      a: `My fitness journey started from a very personal place. I was at a point in my life where I needed to heal from burnout, reset, and rediscover myself.

I didn’t start running because I had some grand fitness goal. I started because I needed movement. I needed something that was mine. Something that reminded me that I could show up for myself every single day.

The first few walks and runs were not about pace or distance. They were about putting one foot in front of the other. Somewhere along the way, those small walks became 5km runs, then 7km, 10km, 14km and longer distances. I started seeing what my body was capable of, but more importantly, I started seeing what I was capable of. There’s something incredibly powerful about watching yourself become stronger in real time.`
    },
    {
      q: "3. What keeps you consistent?",
      a: `Discipline more than motivation.

My alarm goes off at 4:30 a.m., and I’ve learnt not to negotiate with myself too much. By 5:00 a.m., I’m out of bed getting ready. By 5:30, my shoes are usually on, and by 5:45, I’m outside walking or running.

But getting to this point also meant changing other parts of my life. My sleep routine had to change to accommodate my mornings, and that has made a significant difference. By 9:30 p.m., I’m usually already in bed. I’ve realised that if I want to consistently show up for myself in the morning, I also have to take care of myself the night before.

Some mornings are beautiful. Some are cold. Some are rainy. Some days I’m excited, and some days I absolutely do not want to move. But I go anyway.

I’ve learnt that consistency is not about feeling motivated every day. It’s about creating routines that make it easier to keep a promise to yourself.

There have been 50km weeks, long rainy runs, early morning walks, and days when I’ve simply needed to slow down. I’ve learnt to listen to my body without abandoning the commitment.

And one of the biggest things that keeps me going now is seeing my journey inspire other people to invest in their own health and fitness goals. Knowing that someone sees me showing up and thinks, “Maybe I should start too,” has been incredibly encouraging and inspiring for me.

My best friend is a great example. She started walking, and now we’re comfortable doing runs together. Despite our busy schedules, we intentionally make time to walk or run two or three times a week. It has become a way for us to stay connected while also holding each other accountable.

So my consistency is no longer just about me. It has become about the person I’m becoming, the people I’m encouraging, and the community we are building around movement.`
    },
    {
      q: "4. What does community mean to you in your health journey?",
      a: `Community has made the journey more meaningful.

One of the things I’ve discovered is that movement can be very personal, but it doesn’t have to be lonely. Seeing other people running, walking, sharing their progress, encouraging one another and simply showing up creates a different kind of accountability.

That’s one of the reasons I’ve also started building my own little identity around movement. I love the idea that fitness doesn’t have to be intimidating or complicated. Sometimes it’s just getting outside, taking a walk, running your first kilometre, or deciding that today you’re going to show up for yourself.

Being part of the Kulawise Campaign has reinforced that for me. The numbers are great, but what I really love is the reminder that there are other people on their own journeys too.

For me, health is no longer just about exercising or hitting a step count. It is about having the energy to live fully, taking care of myself, creating a life I enjoy, and becoming more intentional about the person I want to be.`
    }
  ],
  closing: `I started this journey trying to heal and rediscover myself. I didn’t expect that I would also discover a version of myself who loves running, looks forward to early mornings, chases kilometres, and sometimes willingly runs in the rain.

And I think that’s the beautiful part of the journey, sometimes you start moving because you’re trying to find yourself, and somewhere along the way, you realise you’ve become someone you’re really proud of.

Onward,
Ifeoma Arua`
};

export const EVAREADY_STORY = {
  id: "emmanuel-amah-evaready",
  name: "Emmanuel Amah (Evaready)",
  role: "Footballer",
  title: "Consistency Isn't Motivation, It's Showing Up",
  subtitle: "Some days motivation isn't there. You put on your headset, play your music, and walk anyway.",
  date: "September 2026",
  readTime: "4 min read",
  posters: [
    "/images/amah-kulawise.jpeg",
  ],
  questions: [
    {
      q: "1. Tell us a little about yourself.",
      a: `My name is Emmanuel Amah, but I prefer to be called Evaready.

I\u2019m a footballer, so fitness is an important part of my life. I\u2019d describe myself as ambitious, creative and resilient \u2014 someone who loves football, music, and staying active.

I enjoy challenging myself, staying consistent, and finding ways to get better both physically and mentally.`
    },
    {
      q: "2. What got you started on your health and fitness journey?",
      a: `Losing a loved one to diabetes made me realise how important it is to stay active and healthy.

I also don\u2019t like how my body functions when I\u2019m not fit. When I\u2019m fit, I think faster, I feel more energetic, and I become more creative. And as a footballer, staying fit helps me perform better and feel more confident.`
    },
    {
      q: "3. What keeps you consistent?",
      a: `What keeps me consistent is how much better I feel when I stay active.

Walking with my headset on and listening to music helps me clear my mind, distract myself from worrying, and gives me time to reset. I have more energy, I think more clearly, and I feel more productive when I\u2019m active.

Even on days I don\u2019t feel like it, I remind myself that consistency is about discipline, not motivation.`
    },
    {
      q: "4. What does community mean to you in your health journey?",
      a: `Community means having people around you who motivate and encourage you to keep going.

Being part of the Kulawise Campaign has made my fitness journey more enjoyable, because seeing other people stay active reminds me that I\u2019m not doing it alone.

And honestly, I also want to beat Ifeoma and take the top spot on the leaderboard. That little competition keeps me motivated to stay consistent and keep moving.`
    }
  ],
  closing: `Some days, motivation isn\u2019t there. So you put on your headset, play your music, take that walk, and remind yourself: consistency isn\u2019t about always feeling motivated. It\u2019s about showing up.

Evaready`
};

export const B2B_CALLOUTS = [
  {
    title: "Wellness Businesses",
    description:
      "Integrate Kulawise into your existing gym, studio, or corporate wellness program.",
    ctaLabel: "Apply to Join",
    href: "mailto:hello@kulawise.com",
    image: null,
  },
  {
    title: "Strategic Partners",
    description:
      "Collaborate with us on community health and sustainability initiatives across our markets.",
    ctaLabel: "Partner with Us",
    href: "mailto:hello@kulawise.com",
    image: null,
  },
];

export type SDGDetailCard = {
  goal: string;
  title: string;
  colorClass: string;
  icon: string;
  target: string;
  action: string;
  image: string | null;
};

export const SDG_DETAIL_CARDS: SDGDetailCard[] = [
  {
    goal: "Goal 3",
    title: "Good Health and Well-being",
    colorClass: "bg-sdg-good-health",
    icon: "favorite",
    target: "Strengthen the prevention and treatment of non-communicable diseases.",
    action:
      "We use habit tracking and local Circles to make preventative wellness accessible day to day, reducing reliance on reactive, after-the-fact healthcare.",
    image: "/images/young-woman-training-gym.jpg",
  },
  {
    goal: "Goal 1",
    title: "No Poverty",
    colorClass: "bg-sdg-no-poverty",
    icon: "savings",
    target: "Build sustainable income pathways through wellness and health work.",
    action:
      "We help wellness and health professionals — coaches, gyms, nutritionists, run clubs — monetize the value they already provide by running paid programs through Kulawise Circles.",
    image: null,
  },
  {
    goal: "Goal 12",
    title: "Responsible Consumption",
    colorClass: "bg-sdg-responsible-consumption",
    icon: "recycling",
    target: "Substantially reduce waste generation through prevention and reduction.",
    action:
      "Pantry-aware shopping lists sync with what members already have, reducing over-purchasing and household food waste.",
    image: null,
  },
  {
    goal: "Goal 17",
    title: "Partnerships for the Goals",
    colorClass: "bg-sdg-partnerships",
    icon: "handshake",
    target: "Enhance the Global Partnership for Sustainable Development.",
    action:
      "We're working toward partnerships with regional insurers and lenders so a verified habit record can unlock better health financing terms.",
    image: null,
  },
];

export const IMPACT_METHODOLOGY = [
  {
    icon: "analytics",
    title: "Real-time Verification",
    description:
      "Habit and activity logs are recorded as they happen, not self-reported after the fact.",
  },
  {
    icon: "checklist_rtl",
    title: "UN Standard Alignment",
    description:
      "Our impact framing is mapped to the relevant UN Sustainable Development Goals, not invented categories.",
  },
];
