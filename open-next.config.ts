import { defineCloudflareConfig } from "@opennextjs/cloudflare";
import r2IncrementalCache from "@opennextjs/cloudflare/overrides/incremental-cache/r2-incremental-cache";
import { withRegionalCache } from "@opennextjs/cloudflare/overrides/incremental-cache/regional-cache";
import doQueue from "@opennextjs/cloudflare/overrides/queue/do-queue";
import queueCache from "@opennextjs/cloudflare/overrides/queue/queue-cache";
import doShardedTagCache from "@opennextjs/cloudflare/overrides/tag-cache/do-sharded-tag-cache";
import { purgeCache } from "@opennextjs/cloudflare/overrides/cache-purge/index";

/**
 * @param {import('@opennextjs/cloudflare').OpenNextConfig}
 */
export default defineCloudflareConfig({
  incrementalCache: withRegionalCache(r2IncrementalCache, {
    mode: "long-lived",
    shouldLazilyUpdateOnCacheHit: true,
  }),
  enableCacheInterception: true,
  queue: queueCache(doQueue, {
    regionalCacheTtlSec: 5,
    waitForQueueAck: true,
  }),
  // This is only required if you use On-demand revalidation
  tagCache: doShardedTagCache({
    baseShardSize: 12,
    regionalCache: true, // Enable regional cache to reduce the load on the DOs
    regionalCacheTtlSec: 5, // The TTL for the regional cache
    regionalCacheDangerouslyPersistMissingTags: true, // Enable this to persist missing tags in the regional cache
    shardReplication: {
      numberOfSoftReplicas: 4,
      numberOfHardReplicas: 2,
      regionalReplication: {
        defaultRegion: "enam",
      },
    },
  }),
  // you can also use the `durableObject` option to use a durable object as a cache purge
  cachePurge: purgeCache({ type: "direct" }),
});
