/**
 * The roster now lives in ./roster, split into a position taxonomy, an
 * accolade registry, the roster itself and a derived query layer.
 *
 * This module is kept as the public entry point so `@/data/players` keeps
 * resolving for existing imports.
 */
export * from './roster';
