import type { MarketingTrap } from '@/models/marketingTrap';

/**
 * Registry of known marketing traps.
 *
 *  - Adding a new trap = adding a new object to this array.
 *  - No other file needs to change; the prompt builder picks it up automatically.
 *
 * All descriptions and detection signals are in English so the LLM interprets them
 * consistently regardless of the user's chosen app language.
 */
export const MARKETING_TRAPS: readonly MarketingTrap[] = [
  {
    id: 'urgency-scarcity',
    name: 'Artificial Urgency & Scarcity',
    description:
      'Retailers create a false sense of time pressure or limited availability to stop ' +
      'consumers from thinking critically. Phrases like "Only 3 left!" or "Sale ends in 2 hours" ' +
      'trigger fear-of-missing-out and bypass rational evaluation.',
    detectionSignals: [
      'mentions a countdown timer or flash sale',
      'says "only X left in stock"',
      'feels they must buy today or the deal will be gone',
      'worries about missing the offer',
      'uses words like "hurry", "now", "limited time"',
    ],
    explanation:
      'This is called artificial urgency or false scarcity. Shops sometimes show "only 2 left" ' +
      'messages even when they have plenty of stock, or put up countdown timers that reset. ' +
      'The goal is to make you feel anxious so you buy before thinking. ' +
      'A good rule of thumb: if the deal disappears overnight, it probably was not that special to begin with.',
  },
  {
    id: 'anchoring',
    name: 'Price Anchoring',
    description:
      'A high original price is shown alongside a discounted price to make the current price ' +
      'look like a great deal. The inflated "anchor" distorts the buyer\'s perception of value, ' +
      'making even an overpriced item feel like a bargain.',
    detectionSignals: [
      'mentions crossed-out prices or "was/now" pricing',
      'focuses on how much money they are saving rather than the actual price paid',
      'compares the item to a much more expensive alternative to justify the purchase',
      'says things like "it was €200, now €80, huge saving!"',
    ],
    explanation:
      'Price anchoring means showing you a high "original" price first, so that the sale price ' +
      'feels amazing by comparison — even if the sale price is still expensive or the item is ' +
      'not something you really need. The key question is: would you pay that sale price if you ' +
      'had never seen the "original" price?',
  },
  {
    id: 'social-proof',
    name: 'Social Proof',
    description:
      'Brands display ratings, review counts, celebrity endorsements, or "bestseller" labels ' +
      'to imply that popularity equals quality or necessity. This exploits the human tendency ' +
      'to follow the crowd, especially under uncertainty.',
    detectionSignals: [
      'cites how many people have bought or reviewed the product',
      'mentions that friends, influencers or celebrities use it',
      'references "bestseller", "#1 rated", or "trending" labels',
      'feels left out because everyone else seems to own it',
    ],
    explanation:
      'Social proof is the idea that "if so many people bought it, it must be good." ' +
      'Companies know this, so they highlight review counts, star ratings, and influencer ' +
      'endorsements. But popularity does not automatically mean the product is right for you. ' +
      'Ask yourself: do the people recommending it have the same needs as you?',
  },
  {
    id: 'decoy-effect',
    name: 'Decoy Effect',
    description:
      'A third pricing option is introduced that is strategically inferior to make one of the ' +
      'other two options look much more attractive. It nudges consumers toward the more ' +
      'expensive option without them realising they are being guided.',
    detectionSignals: [
      'choosing between a basic, mid and premium tier where the mid feels "obviously" inferior',
      'says the mid option is almost the same price as the premium so they might as well upgrade',
      'compares two products and brings up a clearly worse third one',
    ],
    explanation:
      'The decoy effect happens when a product or pricing tier is designed to make another option ' +
      'look irresistible by comparison. For example, a small drink at €2, a medium at €3.80, ' +
      'and a large at €4. The medium seems pointless, so you buy large — which was always the goal. ' +
      'Be aware when a "bad" option appears alongside the one being pushed.',
  },
  {
    id: 'fear-of-missing-out',
    name: 'FOMO — Fear of Missing Out',
    description:
      'Marketing leverages social comparison and the fear of being excluded to push purchases. ' +
      'Exclusive memberships, invitation-only sales, or "everyone is buying this" messaging ' +
      'trigger anxiety about falling behind peers.',
    detectionSignals: [
      'worries about not having what others have',
      'mentions exclusive access, members-only, or VIP sale',
      'feels they will be left behind socially if they do not buy',
      'phrases like "everyone has one", "don\'t miss out", "join millions of customers"',
    ],
    explanation:
      'FOMO (Fear of Missing Out) in shopping means feeling anxious that you will be left behind ' +
      'or excluded if you do not buy something. Marketers deliberately create this feeling with ' +
      'exclusive events, invitation-only deals, or showing how many people already own something. ' +
      'Stepping back and asking "what is actually the worst that happens if I do not buy this?" ' +
      'usually deflates the anxiety quickly.',
  },
  {
    id: 'sunk-cost',
    name: 'Sunk-Cost Fallacy',
    description:
      'Consumers feel compelled to make an additional purchase because of previous investments ' +
      '(money, time, subscriptions) that cannot be recovered. Brands exploit this by offering ' +
      'accessories, upgrades, or complementary products after an initial sale.',
    detectionSignals: [
      'already spent money on related products and feels they must complete the set',
      'has a subscription and feels they "may as well" buy the upgrade',
      'mentions prior investment as a reason to continue spending',
      'says things like "I have already bought X, so I might as well get Y"',
    ],
    explanation:
      'The sunk-cost fallacy is when we keep spending money because we have already spent some, ' +
      'even when it no longer makes sense. "I have already paid €50 for the base game, so I may ' +
      'as well buy the €30 DLC." But the €50 is gone either way — the only question is whether ' +
      'the new purchase is worth it on its own merits.',
  },
  {
    id: 'reciprocity',
    name: 'Reciprocity Trap',
    description:
      'Giving something for free (samples, trials, free gifts, loyalty points) triggers a ' +
      'psychological obligation in the consumer to give something back — usually by making a ' +
      'purchase. This exploits the deeply ingrained human norm of reciprocity.',
    detectionSignals: [
      'received a free gift, sample or extended trial before the purchase decision',
      'has loyalty or reward points about to expire',
      'feels guilty or obligated toward a brand after receiving something for free',
      'mentions a "free" bonus bundled with a purchase to justify buying',
    ],
    explanation:
      'When a shop gives you something for free — a sample, a gift, a 30-day trial — your brain ' +
      'naturally wants to return the favour. Marketers count on this: they give a little so you ' +
      'feel obliged to buy. Recognising this feeling does not mean you owe them anything. ' +
      'Free samples are a marketing cost, not a personal favour.',
  },
  {
    id: 'authority-bias',
    name: 'Authority Bias',
    description:
      'Endorsements from experts, doctors, scientists, award bodies, or vague "laboratory tested" ' +
      'claims increase perceived credibility and reduce critical evaluation. Consumers assume ' +
      'authority figures have validated the product\'s value.',
    detectionSignals: [
      'mentions that experts, doctors or scientists recommend the product',
      'references awards, certifications or lab tests as a reason to trust the product',
      'cites an influencer specialised in the field as validation',
      'phrases like "clinically proven", "recommended by professionals", "award-winning"',
    ],
    explanation:
      'Authority bias means trusting a product more because an expert or institution backs it. ' +
      'While genuine expert opinion matters, many brands use vague claims like "clinically tested" ' +
      'or "recommended by 9 out of 10 dentists" without providing real evidence. ' +
      'Always ask: who exactly are these experts, who funded the study, and does it apply to me?',
  },
] as const;
