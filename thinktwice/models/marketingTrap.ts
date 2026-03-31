/**
 * Interface that defines the shape of a marketing trap.
 */
export interface MarketingTrap {
  /**
   * Unique slug identifier for the trap (e.g. 'urgency-scarcity').
   */
  id: string;

  /**
   * Human-readable technical name of the trap (English, used in the LLM prompt).
   */
  name: string;

  /**
   * What the trap is and how it works from a marketing/psychology perspective.
   * Written in English to ensure consistent LLM interpretation.
   */
  description: string;

  /**
   * Conversational signals or phrases that suggest the user may be falling into this trap.
   * The LLM uses these to silently detect the trap during the conversation.
   */
  detectionSignals: string[];

  /**
   * Clear, jargon-free explanation to share with the user once they recognise the trap.
   * Should be understandable without any business psychology background.
   */
  explanation: string;
}
