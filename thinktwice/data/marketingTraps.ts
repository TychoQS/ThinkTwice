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
  {
    id: 'loss-aversion',
    name: 'Loss Aversion',
    description:
      'People feel the pain of a loss more intensely than the pleasure of an equivalent gain. ' +
      'Marketers exploit this by framing purchases as preventing losses rather than achieving gains.',
    detectionSignals: [
      'worried about missing out or losing something they already have',
      'feels that NOT buying means losing something valuable',
      'reacts more strongly to the downside of not buying than the upside of buying',
      'phrases like "don\'t miss out", "you\'ll lose this offer", "protect yourself from..."',
    ],
    explanation:
      'Loss aversion means we hate losing things more than we enjoy gaining them — roughly twice as much. ' +
      'Marketers exploit this by framing a purchase as preventing a loss: "Don\'t miss out" or ' +
      '"Protect yourself from rising prices." Ask yourself: am I buying to gain something I genuinely want, ' +
      'or just to avoid the uncomfortable feeling of losing out?',
  },
  {
    id: 'framing-effect',
    name: 'Framing Effect',
    description:
      'The way information is presented influences decision-making even when the underlying facts are identical. ' +
      'Positive framing ("95% fat-free") consistently feels more attractive than negative framing ("5% fat").',
    detectionSignals: [
      'focuses on a percentage or statistic used in the marketing',
      'mentions how the product was described rather than what it actually delivers',
      'reacts to the presentation style more than the actual facts',
      'reasoning based on phrases like "saves you X" rather than "costs you Y"',
    ],
    explanation:
      'The framing effect is when the way something is described changes how we feel about it, ' +
      'even if the facts are identical. "90% fat-free" and "10% fat" are the same, but one feels healthier. ' +
      '"Pay only €2 a day" and "€730 a year" are the same price, but one feels smaller. ' +
      'Try to reframe the information yourself: what does it actually cost, do, or deliver in plain terms?',
  },
  {
    id: 'endowment-effect',
    name: 'Endowment Effect',
    description:
      'People assign more value to things once they feel a sense of ownership over them. ' +
      'Free trials, product demos, and "try before you buy" schemes exploit this psychological ownership effect.',
    detectionSignals: [
      'mentions a free trial, test period, or demo they are currently using',
      'feels reluctant to cancel or give back something they have been using temporarily',
      'says things like "I\'ve already set it up / got used to it"',
      'has personalised or invested time into a product before deciding to buy',
    ],
    explanation:
      'The endowment effect means we value things more once we feel they are "ours," even temporarily. ' +
      'That is exactly why companies offer free trials: once you have set it up, customised it, ' +
      'and gotten used to it, cancelling feels like a loss. ' +
      'The question to ask is: would I pay for this if I had never tried it and had no existing attachment to it?',
  },
  {
    id: 'availability-heuristic',
    name: 'Availability Heuristic',
    description:
      'People judge the likelihood or importance of something based on how easily examples come to mind. ' +
      'Vivid advertising, dramatic testimonials, and memorable stories make products feel more necessary than they are.',
    detectionSignals: [
      'recalls a dramatic story, testimonial, or advertisement about the product',
      'overestimates how often they would use the product based on one memorable example',
      'reasoning seems based on a single striking case rather than actual frequency',
      'feels the product is essential because of a recent vivid experience or news story',
    ],
    explanation:
      'The availability heuristic is when we think something is more common or important because it is easy to remember. ' +
      'If an ad shows a dramatic scenario where the product saved someone, that image sticks — ' +
      'making the product feel essential even if that scenario rarely applies to you. ' +
      'Ask yourself: how often does that situation actually come up in my real, everyday life?',
  },
  {
    id: 'bandwagon-effect',
    name: 'Bandwagon Effect',
    description:
      'People adopt behaviours, products, or beliefs simply because many others are doing the same. ' +
      'Viral trends, mass-adoption messaging, and "everyone has one" language trigger this herd mentality.',
    detectionSignals: [
      'mentions that a product is viral, trending, or that "everyone has one"',
      'motivated by wanting to be part of a popular trend',
      'feels outdated or left behind for not having the product yet',
      'references what friends, family, or colleagues are currently buying',
    ],
    explanation:
      'The bandwagon effect is when we want something simply because lots of other people have it. ' +
      'Viral products, trend-driven purchases, and "most popular" labels all exploit this. ' +
      'Popularity, however, does not mean something is right for you — it means it was heavily marketed. ' +
      'Ask yourself: would I still want this if nobody around me had it?',
  },
  {
    id: 'charm-pricing',
    name: 'Charm Pricing',
    description:
      'Prices ending in .99, .95, or .97 are perceived as significantly cheaper than the next whole number, ' +
      'even when the difference is minimal. This exploits left-digit anchoring in price perception.',
    detectionSignals: [
      'mentions a price that ends in .99 or similar (e.g. €49.99, €9.95)',
      'perceives the product as being in a lower price bracket than it actually is',
      'says something like "it\'s only €49" when the price is €49.99',
      'the perceived deal is driven by the price format rather than actual value',
    ],
    explanation:
      'Charm pricing is the practice of ending prices in .99 or .95. ' +
      'Our brains read €49.99 as "forty-something" rather than "essentially €50." ' +
      'It is a small psychological trick, but it consistently makes prices feel lower than they are. ' +
      'Always round the price up mentally and ask: would I still buy this at the rounded number?',
  },
  {
    id: 'bundle-pricing',
    name: 'Bundle Pricing',
    description:
      'Multiple products are packaged together at a combined price to create an impression of greater value, ' +
      'often including items the buyer does not actually need or want.',
    detectionSignals: [
      'considering a package or bundle deal with multiple items',
      'feels the bundle is a good deal because of the total perceived value',
      'would not buy all items in the bundle individually at their separate prices',
      'mentions getting "extras" bundled in that they probably would not use',
    ],
    explanation:
      'Bundle pricing packages multiple products together to make the total seem like a great deal. ' +
      'The catch is that bundles often include things you do not need, and the "savings" only apply ' +
      'if you actually value every item in the package. ' +
      'Ask yourself: if each item were sold separately, would I actually buy them all — or just the one I want?',
  },
  {
    id: 'partitioned-pricing',
    name: 'Partitioned Pricing',
    description:
      'The full price is split into a low base price plus separate mandatory fees — shipping, handling, ' +
      'add-ons — making the initial price appear more attractive while obscuring the true total cost.',
    detectionSignals: [
      'noticed only the base price before discovering additional fees',
      'mentions shipping, handling, or mandatory add-on costs shown separately',
      'total cost is significantly higher than the initially advertised price',
      'says things like "it was €20 but then shipping was €8 on top"',
    ],
    explanation:
      'Partitioned pricing separates a product\'s total cost into a low headline price plus extra fees. ' +
      'The €20 item with €8 shipping and a €5 service fee is really €33, but your attention went to "€20." ' +
      'Always calculate the full final price before deciding, and compare that total to alternatives — ' +
      'not the headline number.',
  },
  {
    id: 'confirmshaming',
    name: 'Confirmshaming',
    description:
      'The interface phrases the decline option in a way that shames or belittles the user for not accepting, ' +
      'making rejection feel socially or emotionally costly.',
    detectionSignals: [
      'encountered a "No thanks, I don\'t want to save money" style decline button',
      'felt guilty or embarrassed about declining an offer',
      'the opt-out option used negative self-referential language',
      'felt pressured by the wording of the rejection option rather than the offer itself',
    ],
    explanation:
      'Confirmshaming is when a website phrases the "No" button in a way designed to make you feel bad about yourself. ' +
      'For example: "No thanks, I prefer paying full price." or "I don\'t want to be healthier." ' +
      'The goal is to make declining feel like a personal flaw. ' +
      'Recognise this as a manipulation tactic — you are never obliged to accept an offer ' +
      'simply because the decline button is worded unpleasantly.',
  },
  {
    id: 'misdirection',
    name: 'Misdirection',
    description:
      'Interface design deliberately draws attention toward certain elements while hiding or minimising others — ' +
      'making the "buy" button large and prominent while burying the "cancel" option in small grey text.',
    detectionSignals: [
      'had difficulty finding the cancel, decline, or unsubscribe option',
      'the "buy" or "confirm" button was far more visually prominent than the alternative',
      'important information such as fees or terms was in small print or hidden behind extra clicks',
      'felt subtly guided toward one option without noticing the alternatives',
    ],
    explanation:
      'Misdirection in interfaces means designing a screen so your eye naturally goes to the "yes" button ' +
      'while the "no" option is hidden, greyed out, or in tiny text. This is a well-known dark pattern. ' +
      'If you struggle to find the cancel button, that is intentional. ' +
      'Take a moment to look for all available options before clicking — you may have more choices than the design suggests.',
  },
] as const;
