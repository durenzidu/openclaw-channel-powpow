import { A as GroupChatSchema, F as SecretRef, M as MessagesSchema, N as ProviderCommandsSchema, O as BroadcastSchema, P as SecretInput, T as TtsConfigSchema, j as MentionPatternsPolicySchema, k as DmConfigSchema } from "./types.secrets-BuGeX7LK.js";
import { C as ReplyToMode, O as SessionSendPolicyAction, a as ChannelDeliveryStreamingConfig, d as ChannelStreamingProgressConfig, f as ContextVisibilityMode, g as GroupPolicy, k as SessionThreadBindingsConfig, l as ChannelStreamingConfig, m as DmPolicy, o as ChannelPreviewStreamingConfig, t as AgentElevatedAllowFromConfig, u as ChannelStreamingPreviewConfig, x as MarkdownConfig } from "./types.base-DSGitsUq.js";
import { TSchema } from "typebox";
import { z } from "zod";
//#region src/shared/config-ui-hints-types.d.ts
type ConfigUiPresentation = "phone-number";
/** Authored groups of immediate object properties; descendants stay with their parent. */
type ConfigUiGroup = {
  id: string;
  title: string;
  order?: number;
  properties: string[];
};
//#endregion
//#region src/shared/json-schema.types.d.ts
/** TypeBox schema value widened for generic JSON-schema object transforms. */
type JsonSchemaObject = TSchema & Record<string, unknown>;
//#endregion
//#region src/channels/plugins/types.config.d.ts
/** Optional UI metadata for a JSON Schema property. */
type ChannelConfigUiHint = {
  label?: string;
  help?: string;
  tags?: string[];
  advanced?: boolean;
  sensitive?: boolean;
  placeholder?: string;
  presentation?: ConfigUiPresentation;
  itemTemplate?: unknown;
};
/** Normalized validation issue emitted by a channel runtime parser. */
type ChannelConfigRuntimeIssue = {
  path?: Array<string | number>;
  message?: string;
  code?: string;
} & Record<string, unknown>;
/** Minimal safeParse result shape accepted from channel-owned validators. */
type ChannelConfigRuntimeParseResult = {
  success: true;
  data: unknown;
} | {
  success: false;
  issues: ChannelConfigRuntimeIssue[];
};
/** Runtime validator contract paired with the JSON Schema config surface. */
type ChannelConfigRuntimeSchema = {
  safeParse: (value: unknown) => ChannelConfigRuntimeParseResult;
};
/** Complete channel config schema description exposed to host tooling. */
type ChannelConfigSchema = {
  schema: JsonSchemaObject;
  uiHints?: Record<string, ChannelConfigUiHint>;
  runtime?: ChannelConfigRuntimeSchema;
};
//#endregion
//#region src/config/zod-schema.agent-runtime.d.ts
declare const HeartbeatSchema: z.ZodOptional<z.ZodObject<{
  every: z.ZodOptional<z.ZodString>;
  activeHours: z.ZodOptional<z.ZodObject<{
    start: z.ZodOptional<z.ZodString>;
    end: z.ZodOptional<z.ZodString>;
    timezone: z.ZodOptional<z.ZodString>;
  }, z.core.$strict>>;
  model: z.ZodOptional<z.ZodString>;
  session: z.ZodOptional<z.ZodString>;
  target: z.ZodOptional<z.ZodString>;
  directPolicy: z.ZodOptional<z.ZodUnion<readonly [z.ZodLiteral<"allow">, z.ZodLiteral<"block">]>>;
  to: z.ZodOptional<z.ZodString>;
  accountId: z.ZodOptional<z.ZodString>;
  prompt: z.ZodOptional<z.ZodString>;
  timeoutSeconds: z.ZodOptional<z.ZodNumber>;
  lightContext: z.ZodOptional<z.ZodBoolean>;
  isolatedSession: z.ZodOptional<z.ZodBoolean>;
}, z.core.$strict>>;
declare const AgentContextLimitsSchema: z.ZodOptional<z.ZodObject<{
  memoryGetMaxChars: z.ZodOptional<z.ZodNumber>;
  postCompactionMaxChars: z.ZodOptional<z.ZodNumber>;
}, z.core.$strict>>;
declare const ToolPolicySchema: z.ZodOptional<z.ZodObject<{
  allow: z.ZodOptional<z.ZodArray<z.ZodString>>;
  alsoAllow: z.ZodOptional<z.ZodArray<z.ZodString>>;
  deny: z.ZodOptional<z.ZodArray<z.ZodString>>;
}, z.core.$strict>>;
declare const AgentEntrySchema: z.ZodObject<{
  id: z.ZodString;
  name: z.ZodOptional<z.ZodString>;
  description: z.ZodOptional<z.ZodString>;
  workspace: z.ZodOptional<z.ZodString>;
  cwd: z.ZodOptional<z.ZodString>;
  agentDir: z.ZodOptional<z.ZodString>;
  model: z.ZodOptional<z.ZodUnion<readonly [z.ZodString, z.ZodObject<{
    primary: z.ZodOptional<z.ZodString>;
    fallbacks: z.ZodOptional<z.ZodArray<z.ZodString>>;
  }, z.core.$strict>]>>;
  utilityModel: z.ZodOptional<z.ZodString>;
  models: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodObject<{
    alias: z.ZodOptional<z.ZodString>;
    params: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
    agentRuntime: z.ZodOptional<z.ZodObject<{
      id: z.ZodOptional<z.ZodString>;
    }, z.core.$strict>>;
    pickerRuntimes: z.ZodOptional<z.ZodArray<z.ZodString>>;
    codeMode: z.ZodOptional<z.ZodBoolean>;
    streaming: z.ZodOptional<z.ZodBoolean>;
  }, z.core.$strict>>>;
  modelPolicy: z.ZodOptional<z.ZodObject<{
    allow: z.ZodOptional<z.ZodArray<z.ZodString>>;
  }, z.core.$strict>>;
  thinkingDefault: z.ZodOptional<z.ZodEnum<{
    adaptive: "adaptive";
    high: "high";
    low: "low";
    max: "max";
    medium: "medium";
    minimal: "minimal";
    off: "off";
    ultra: "ultra";
    xhigh: "xhigh";
  }>>;
  verboseDefault: z.ZodOptional<z.ZodEnum<{
    full: "full";
    off: "off";
    on: "on";
  }>>;
  toolProgressDetail: z.ZodOptional<z.ZodEnum<{
    explain: "explain";
    raw: "raw";
  }>>;
  reasoningDefault: z.ZodOptional<z.ZodEnum<{
    off: "off";
    on: "on";
    stream: "stream";
  }>>;
  fastModeDefault: z.ZodOptional<z.ZodUnion<readonly [z.ZodBoolean, z.ZodLiteral<"auto">]>>;
  contextInjection: z.ZodOptional<z.ZodUnion<readonly [z.ZodLiteral<"always">, z.ZodLiteral<"continuation-skip">, z.ZodLiteral<"never">]>>;
  bootstrapMaxChars: z.ZodOptional<z.ZodNumber>;
  bootstrapTotalMaxChars: z.ZodOptional<z.ZodNumber>;
  experimental: z.ZodOptional<z.ZodObject<{
    localModelLean: z.ZodOptional<z.ZodBoolean>;
  }, z.core.$strict>>;
  skills: z.ZodOptional<z.ZodArray<z.ZodString>>;
  subagents: z.ZodOptional<z.ZodObject<{
    delegationMode: z.ZodOptional<z.ZodEnum<{
      prefer: "prefer";
      suggest: "suggest";
    }>>;
    allowAgents: z.ZodOptional<z.ZodArray<z.ZodString>>;
    model: z.ZodOptional<z.ZodUnion<readonly [z.ZodString, z.ZodObject<{
      primary: z.ZodOptional<z.ZodString>;
      fallbacks: z.ZodOptional<z.ZodArray<z.ZodString>>;
    }, z.core.$strict>]>>;
    thinking: z.ZodOptional<z.ZodString>;
    requireAgentId: z.ZodOptional<z.ZodBoolean>;
  }, z.core.$strict>>;
  embeddedAgent: z.ZodOptional<z.ZodObject<{
    executionContract: z.ZodOptional<z.ZodUnion<readonly [z.ZodLiteral<"default">, z.ZodLiteral<"strict-agentic">]>>;
  }, z.core.$strict>>;
  params: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
  runtime: z.ZodOptional<z.ZodUnion<readonly [z.ZodObject<{
    type: z.ZodLiteral<"embedded">;
  }, z.core.$strict>, z.ZodObject<{
    type: z.ZodLiteral<"acp">;
    acp: z.ZodOptional<z.ZodObject<{
      agent: z.ZodOptional<z.ZodString>;
      backend: z.ZodOptional<z.ZodString>;
      mode: z.ZodOptional<z.ZodEnum<{
        oneshot: "oneshot";
        persistent: "persistent";
      }>>;
      cwd: z.ZodOptional<z.ZodString>;
    }, z.core.$strict>>;
  }, z.core.$strict>]>>;
  memory: z.ZodOptional<z.ZodObject<{
    search: z.ZodOptional<z.ZodObject<{
      enabled: z.ZodOptional<z.ZodBoolean>;
      rememberAcrossConversations: z.ZodOptional<z.ZodBoolean>;
      sources: z.ZodOptional<z.ZodArray<z.ZodUnion<readonly [z.ZodLiteral<"memory">, z.ZodLiteral<"sessions">]>>>;
      extraPaths: z.ZodOptional<z.ZodArray<z.ZodUnion<readonly [z.ZodString, z.ZodObject<{
        path: z.ZodString;
        pattern: z.ZodOptional<z.ZodString>;
      }, z.core.$strict>]>>>;
      multimodal: z.ZodOptional<z.ZodObject<{
        enabled: z.ZodOptional<z.ZodBoolean>;
        modalities: z.ZodOptional<z.ZodArray<z.ZodUnion<readonly [z.ZodLiteral<"image">, z.ZodLiteral<"audio">, z.ZodLiteral<"all">]>>>;
        maxFileBytes: z.ZodOptional<z.ZodNumber>;
      }, z.core.$strict>>;
      experimental: z.ZodOptional<z.ZodObject<{
        sessionMemory: z.ZodOptional<z.ZodBoolean>;
      }, z.core.$strict>>;
      provider: z.ZodOptional<z.ZodString>;
      remote: z.ZodOptional<z.ZodObject<{
        baseUrl: z.ZodOptional<z.ZodString>;
        apiKey: z.ZodOptional<z.ZodUnion<readonly [z.ZodString, z.ZodDiscriminatedUnion<[z.ZodObject<{
          source: z.ZodLiteral<"env">;
          provider: z.ZodString;
          id: z.ZodString;
        }, z.core.$strict>, z.ZodObject<{
          source: z.ZodLiteral<"file">;
          provider: z.ZodString;
          id: z.ZodString;
        }, z.core.$strict>, z.ZodObject<{
          source: z.ZodLiteral<"exec">;
          provider: z.ZodString;
          id: z.ZodString;
        }, z.core.$strict>, z.ZodObject<{
          source: z.ZodLiteral<"store">;
          provider: z.ZodString;
          id: z.ZodString;
        }, z.core.$strict>], "source">]>>;
        headers: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
        batch: z.ZodOptional<z.ZodObject<{
          enabled: z.ZodOptional<z.ZodBoolean>;
        }, z.core.$strict>>;
      }, z.core.$strict>>;
      fallback: z.ZodOptional<z.ZodString>;
      model: z.ZodOptional<z.ZodString>;
      inputType: z.ZodOptional<z.ZodString>;
      queryInputType: z.ZodOptional<z.ZodString>;
      documentInputType: z.ZodOptional<z.ZodString>;
      outputDimensionality: z.ZodOptional<z.ZodNumber>;
      local: z.ZodOptional<z.ZodObject<{
        modelPath: z.ZodOptional<z.ZodString>;
      }, z.core.$strict>>;
      store: z.ZodOptional<z.ZodObject<{
        fts: z.ZodOptional<z.ZodObject<{
          tokenizer: z.ZodOptional<z.ZodUnion<readonly [z.ZodLiteral<"unicode61">, z.ZodLiteral<"trigram">]>>;
        }, z.core.$strict>>;
        vector: z.ZodOptional<z.ZodObject<{
          enabled: z.ZodOptional<z.ZodBoolean>;
          extensionPath: z.ZodOptional<z.ZodString>;
        }, z.core.$strict>>;
      }, z.core.$strict>>;
      query: z.ZodOptional<z.ZodObject<{
        maxResults: z.ZodOptional<z.ZodNumber>;
        minScore: z.ZodOptional<z.ZodNumber>;
      }, z.core.$strict>>;
      cache: z.ZodOptional<z.ZodObject<{
        enabled: z.ZodOptional<z.ZodBoolean>;
      }, z.core.$strict>>;
    }, z.core.$strict>>;
  }, z.core.$strict>>;
  humanDelay: z.ZodOptional<z.ZodObject<{
    mode: z.ZodOptional<z.ZodUnion<readonly [z.ZodLiteral<"off">, z.ZodLiteral<"natural">, z.ZodLiteral<"custom">]>>;
    minMs: z.ZodOptional<z.ZodNumber>;
    maxMs: z.ZodOptional<z.ZodNumber>;
  }, z.core.$strict>>;
  typingMode: z.ZodOptional<z.ZodUnion<readonly [z.ZodLiteral<"never">, z.ZodLiteral<"instant">, z.ZodLiteral<"thinking">, z.ZodLiteral<"message">]>>;
  tts: z.ZodOptional<z.ZodObject<{
    auto: z.ZodOptional<z.ZodEnum<{
      always: "always";
      inbound: "inbound";
      off: "off";
      tagged: "tagged";
    }>>;
    enabled: z.ZodOptional<z.ZodBoolean>;
    mode: z.ZodOptional<z.ZodEnum<{
      all: "all";
      final: "final";
    }>>;
    provider: z.ZodOptional<z.ZodString>;
    persona: z.ZodOptional<z.ZodString>;
    personas: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodObject<{
      label: z.ZodOptional<z.ZodString>;
      description: z.ZodOptional<z.ZodString>;
      provider: z.ZodOptional<z.ZodString>;
      fallbackPolicy: z.ZodOptional<z.ZodUnion<readonly [z.ZodLiteral<"preserve-persona">, z.ZodLiteral<"provider-defaults">, z.ZodLiteral<"fail">]>>;
      providers: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodObject<{
        apiKey: z.ZodOptional<z.ZodUnion<readonly [z.ZodString, z.ZodDiscriminatedUnion<[z.ZodObject<{
          source: z.ZodLiteral<"env">;
          provider: z.ZodString;
          id: z.ZodString;
        }, z.core.$strict>, z.ZodObject<{
          source: z.ZodLiteral<"file">;
          provider: z.ZodString;
          id: z.ZodString;
        }, z.core.$strict>, z.ZodObject<{
          source: z.ZodLiteral<"exec">;
          provider: z.ZodString;
          id: z.ZodString;
        }, z.core.$strict>, z.ZodObject<{
          source: z.ZodLiteral<"store">;
          provider: z.ZodString;
          id: z.ZodString;
        }, z.core.$strict>], "source">]>>;
      }, z.core.$catchall<z.ZodUnion<readonly [z.ZodString, z.ZodNumber, z.ZodBoolean, z.ZodNull, z.ZodArray<z.ZodUnknown>, z.ZodRecord<z.ZodString, z.ZodUnknown>]>>>>>;
    }, z.core.$strict>>>;
    summaryModel: z.ZodOptional<z.ZodString>;
    modelOverrides: z.ZodOptional<z.ZodObject<{
      enabled: z.ZodOptional<z.ZodBoolean>;
      allowText: z.ZodOptional<z.ZodBoolean>;
      allowProvider: z.ZodOptional<z.ZodBoolean>;
      allowVoice: z.ZodOptional<z.ZodBoolean>;
      allowModelId: z.ZodOptional<z.ZodBoolean>;
      allowVoiceSettings: z.ZodOptional<z.ZodBoolean>;
      allowNormalization: z.ZodOptional<z.ZodBoolean>;
      allowSeed: z.ZodOptional<z.ZodBoolean>;
    }, z.core.$strict>>;
    providers: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodObject<{
      apiKey: z.ZodOptional<z.ZodUnion<readonly [z.ZodString, z.ZodDiscriminatedUnion<[z.ZodObject<{
        source: z.ZodLiteral<"env">;
        provider: z.ZodString;
        id: z.ZodString;
      }, z.core.$strict>, z.ZodObject<{
        source: z.ZodLiteral<"file">;
        provider: z.ZodString;
        id: z.ZodString;
      }, z.core.$strict>, z.ZodObject<{
        source: z.ZodLiteral<"exec">;
        provider: z.ZodString;
        id: z.ZodString;
      }, z.core.$strict>, z.ZodObject<{
        source: z.ZodLiteral<"store">;
        provider: z.ZodString;
        id: z.ZodString;
      }, z.core.$strict>], "source">]>>;
    }, z.core.$catchall<z.ZodUnion<readonly [z.ZodString, z.ZodNumber, z.ZodBoolean, z.ZodNull, z.ZodArray<z.ZodUnknown>, z.ZodRecord<z.ZodString, z.ZodUnknown>]>>>>>;
    maxTextLength: z.ZodOptional<z.ZodNumber>;
    timeoutMs: z.ZodOptional<z.ZodNumber>;
    prefsPath: z.ZodOptional<z.ZodString>;
  }, z.core.$strict>>;
  skillsLimits: z.ZodOptional<z.ZodObject<{
    maxSkillsPromptChars: z.ZodOptional<z.ZodNumber>;
  }, z.core.$strict>>;
  contextLimits: z.ZodOptional<z.ZodObject<{
    memoryGetMaxChars: z.ZodOptional<z.ZodNumber>;
    postCompactionMaxChars: z.ZodOptional<z.ZodNumber>;
  }, z.core.$strict>>;
  heartbeat: z.ZodOptional<z.ZodObject<{
    every: z.ZodOptional<z.ZodString>;
    activeHours: z.ZodOptional<z.ZodObject<{
      start: z.ZodOptional<z.ZodString>;
      end: z.ZodOptional<z.ZodString>;
      timezone: z.ZodOptional<z.ZodString>;
    }, z.core.$strict>>;
    model: z.ZodOptional<z.ZodString>;
    session: z.ZodOptional<z.ZodString>;
    target: z.ZodOptional<z.ZodString>;
    directPolicy: z.ZodOptional<z.ZodUnion<readonly [z.ZodLiteral<"allow">, z.ZodLiteral<"block">]>>;
    to: z.ZodOptional<z.ZodString>;
    accountId: z.ZodOptional<z.ZodString>;
    prompt: z.ZodOptional<z.ZodString>;
    timeoutSeconds: z.ZodOptional<z.ZodNumber>;
    lightContext: z.ZodOptional<z.ZodBoolean>;
    isolatedSession: z.ZodOptional<z.ZodBoolean>;
  }, z.core.$strict>>;
  identity: z.ZodOptional<z.ZodObject<{
    name: z.ZodOptional<z.ZodString>;
    theme: z.ZodOptional<z.ZodString>;
    emoji: z.ZodOptional<z.ZodString>;
    avatar: z.ZodOptional<z.ZodString>;
  }, z.core.$strict>>;
  groupChat: z.ZodOptional<z.ZodObject<{
    mentionPatterns: z.ZodOptional<z.ZodArray<z.ZodString>>;
    historyLimit: z.ZodOptional<z.ZodNumber>;
    unmentionedInbound: z.ZodOptional<z.ZodEnum<{
      room_event: "room_event";
      user_request: "user_request";
    }>>;
  }, z.core.$strict>>;
  sandbox: z.ZodOptional<z.ZodObject<{
    mode: z.ZodOptional<z.ZodUnion<readonly [z.ZodLiteral<"off">, z.ZodLiteral<"non-main">, z.ZodLiteral<"all">]>>;
    backend: z.ZodOptional<z.ZodString>;
    workspaceAccess: z.ZodOptional<z.ZodUnion<readonly [z.ZodLiteral<"none">, z.ZodLiteral<"ro">, z.ZodLiteral<"rw">]>>;
    sessionToolsVisibility: z.ZodOptional<z.ZodUnion<readonly [z.ZodLiteral<"spawned">, z.ZodLiteral<"all">]>>;
    scope: z.ZodOptional<z.ZodUnion<readonly [z.ZodLiteral<"session">, z.ZodLiteral<"agent">, z.ZodLiteral<"shared">]>>;
    workspaceRoot: z.ZodOptional<z.ZodString>;
    docker: z.ZodOptional<z.ZodObject<{
      image: z.ZodOptional<z.ZodString>;
      containerPrefix: z.ZodOptional<z.ZodString>;
      workdir: z.ZodOptional<z.ZodString>;
      readOnlyRoot: z.ZodOptional<z.ZodBoolean>;
      tmpfs: z.ZodOptional<z.ZodArray<z.ZodString>>;
      network: z.ZodOptional<z.ZodString>;
      user: z.ZodOptional<z.ZodString>;
      capDrop: z.ZodOptional<z.ZodArray<z.ZodString>>;
      env: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
      setupCommand: z.ZodOptional<z.ZodPipe<z.ZodPipe<z.ZodUnion<readonly [z.ZodString, z.ZodArray<z.ZodString>]>, z.ZodTransform<string, string | string[]>>, z.ZodString>>;
      pidsLimit: z.ZodOptional<z.ZodNumber>;
      memory: z.ZodOptional<z.ZodUnion<readonly [z.ZodString, z.ZodNumber]>>;
      memorySwap: z.ZodOptional<z.ZodUnion<readonly [z.ZodString, z.ZodNumber]>>;
      cpus: z.ZodOptional<z.ZodNumber>;
      gpus: z.ZodOptional<z.ZodString>;
      ulimits: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnion<readonly [z.ZodString, z.ZodNumber, z.ZodObject<{
        soft: z.ZodOptional<z.ZodNumber>;
        hard: z.ZodOptional<z.ZodNumber>;
      }, z.core.$strict>]>>>;
      seccompProfile: z.ZodOptional<z.ZodString>;
      apparmorProfile: z.ZodOptional<z.ZodString>;
      dns: z.ZodOptional<z.ZodArray<z.ZodString>>;
      extraHosts: z.ZodOptional<z.ZodArray<z.ZodString>>;
      binds: z.ZodOptional<z.ZodArray<z.ZodString>>;
      dangerouslyAllowReservedContainerTargets: z.ZodOptional<z.ZodBoolean>;
      dangerouslyAllowExternalBindSources: z.ZodOptional<z.ZodBoolean>;
      dangerouslyAllowContainerNamespaceJoin: z.ZodOptional<z.ZodBoolean>;
    }, z.core.$strict>>;
    ssh: z.ZodOptional<z.ZodObject<{
      target: z.ZodOptional<z.ZodString>;
      command: z.ZodOptional<z.ZodString>;
      workspaceRoot: z.ZodOptional<z.ZodString>;
      strictHostKeyChecking: z.ZodOptional<z.ZodBoolean>;
      updateHostKeys: z.ZodOptional<z.ZodBoolean>;
      identityFile: z.ZodOptional<z.ZodString>;
      certificateFile: z.ZodOptional<z.ZodString>;
      knownHostsFile: z.ZodOptional<z.ZodString>;
      identityData: z.ZodOptional<z.ZodUnion<readonly [z.ZodString, z.ZodDiscriminatedUnion<[z.ZodObject<{
        source: z.ZodLiteral<"env">;
        provider: z.ZodString;
        id: z.ZodString;
      }, z.core.$strict>, z.ZodObject<{
        source: z.ZodLiteral<"file">;
        provider: z.ZodString;
        id: z.ZodString;
      }, z.core.$strict>, z.ZodObject<{
        source: z.ZodLiteral<"exec">;
        provider: z.ZodString;
        id: z.ZodString;
      }, z.core.$strict>, z.ZodObject<{
        source: z.ZodLiteral<"store">;
        provider: z.ZodString;
        id: z.ZodString;
      }, z.core.$strict>], "source">]>>;
      certificateData: z.ZodOptional<z.ZodUnion<readonly [z.ZodString, z.ZodDiscriminatedUnion<[z.ZodObject<{
        source: z.ZodLiteral<"env">;
        provider: z.ZodString;
        id: z.ZodString;
      }, z.core.$strict>, z.ZodObject<{
        source: z.ZodLiteral<"file">;
        provider: z.ZodString;
        id: z.ZodString;
      }, z.core.$strict>, z.ZodObject<{
        source: z.ZodLiteral<"exec">;
        provider: z.ZodString;
        id: z.ZodString;
      }, z.core.$strict>, z.ZodObject<{
        source: z.ZodLiteral<"store">;
        provider: z.ZodString;
        id: z.ZodString;
      }, z.core.$strict>], "source">]>>;
      knownHostsData: z.ZodOptional<z.ZodUnion<readonly [z.ZodString, z.ZodDiscriminatedUnion<[z.ZodObject<{
        source: z.ZodLiteral<"env">;
        provider: z.ZodString;
        id: z.ZodString;
      }, z.core.$strict>, z.ZodObject<{
        source: z.ZodLiteral<"file">;
        provider: z.ZodString;
        id: z.ZodString;
      }, z.core.$strict>, z.ZodObject<{
        source: z.ZodLiteral<"exec">;
        provider: z.ZodString;
        id: z.ZodString;
      }, z.core.$strict>, z.ZodObject<{
        source: z.ZodLiteral<"store">;
        provider: z.ZodString;
        id: z.ZodString;
      }, z.core.$strict>], "source">]>>;
    }, z.core.$strict>>;
    browser: z.ZodOptional<z.ZodObject<{
      enabled: z.ZodOptional<z.ZodBoolean>;
      image: z.ZodOptional<z.ZodString>;
      containerPrefix: z.ZodOptional<z.ZodString>;
      network: z.ZodOptional<z.ZodString>;
      cdpPort: z.ZodOptional<z.ZodNumber>;
      cdpSourceRange: z.ZodOptional<z.ZodString>;
      vncPort: z.ZodOptional<z.ZodNumber>;
      noVncPort: z.ZodOptional<z.ZodNumber>;
      headless: z.ZodOptional<z.ZodBoolean>;
      noVncEnabled: z.ZodOptional<z.ZodBoolean>;
      allowHostControl: z.ZodOptional<z.ZodBoolean>;
      autoStart: z.ZodOptional<z.ZodBoolean>;
      autoStartTimeoutMs: z.ZodOptional<z.ZodNumber>;
      binds: z.ZodOptional<z.ZodArray<z.ZodString>>;
    }, z.core.$strict>>;
    prune: z.ZodOptional<z.ZodObject<{
      idleHours: z.ZodOptional<z.ZodNumber>;
      maxAgeDays: z.ZodOptional<z.ZodNumber>;
    }, z.core.$strict>>;
  }, z.core.$strict>>;
  tools: z.ZodOptional<z.ZodObject<{
    profile: z.ZodOptional<z.ZodUnion<readonly [z.ZodLiteral<"minimal">, z.ZodLiteral<"coding">, z.ZodLiteral<"messaging">, z.ZodLiteral<"full">]>>;
    allow: z.ZodOptional<z.ZodArray<z.ZodString>>;
    alsoAllow: z.ZodOptional<z.ZodArray<z.ZodString>>;
    deny: z.ZodOptional<z.ZodArray<z.ZodString>>;
    byProvider: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodObject<{
      allow: z.ZodOptional<z.ZodArray<z.ZodString>>;
      alsoAllow: z.ZodOptional<z.ZodArray<z.ZodString>>;
      deny: z.ZodOptional<z.ZodArray<z.ZodString>>;
      profile: z.ZodOptional<z.ZodUnion<readonly [z.ZodLiteral<"minimal">, z.ZodLiteral<"coding">, z.ZodLiteral<"messaging">, z.ZodLiteral<"full">]>>;
    }, z.core.$strict>>>;
    toolsBySender: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodOptional<z.ZodObject<{
      allow: z.ZodOptional<z.ZodArray<z.ZodString>>;
      alsoAllow: z.ZodOptional<z.ZodArray<z.ZodString>>;
      deny: z.ZodOptional<z.ZodArray<z.ZodString>>;
    }, z.core.$strict>>>>;
    codeMode: z.ZodOptional<z.ZodUnion<readonly [z.ZodBoolean, z.ZodLiteral<"auto">, z.ZodObject<{
      enabled: z.ZodOptional<z.ZodUnion<readonly [z.ZodBoolean, z.ZodLiteral<"auto">]>>;
      runtime: z.ZodOptional<z.ZodLiteral<"quickjs-wasi">>;
      mode: z.ZodOptional<z.ZodLiteral<"only">>;
      languages: z.ZodOptional<z.ZodArray<z.ZodEnum<{
        javascript: "javascript";
        typescript: "typescript";
      }>>>;
      timeoutMs: z.ZodOptional<z.ZodNumber>;
      memoryLimitBytes: z.ZodOptional<z.ZodNumber>;
      maxOutputBytes: z.ZodOptional<z.ZodNumber>;
      maxSnapshotBytes: z.ZodOptional<z.ZodNumber>;
      maxPendingToolCalls: z.ZodOptional<z.ZodNumber>;
      snapshotTtlSeconds: z.ZodOptional<z.ZodNumber>;
      searchDefaultLimit: z.ZodOptional<z.ZodNumber>;
      maxSearchLimit: z.ZodOptional<z.ZodNumber>;
    }, z.core.$strict>]>>;
    swarm: z.ZodOptional<z.ZodUnion<readonly [z.ZodBoolean, z.ZodObject<{
      enabled: z.ZodOptional<z.ZodBoolean>;
      maxConcurrent: z.ZodOptional<z.ZodNumber>;
      maxChildrenPerGroup: z.ZodOptional<z.ZodNumber>;
      maxTotalPerGroup: z.ZodOptional<z.ZodNumber>;
      waitTimeoutSecondsMax: z.ZodOptional<z.ZodNumber>;
      defaultAgentId: z.ZodOptional<z.ZodString>;
    }, z.core.$strict>]>>;
    elevated: z.ZodOptional<z.ZodObject<{
      enabled: z.ZodOptional<z.ZodBoolean>;
      allowFrom: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodArray<z.ZodUnion<readonly [z.ZodString, z.ZodNumber]>>>>;
    }, z.core.$strict>>;
    exec: z.ZodOptional<z.ZodObject<{
      host: z.ZodOptional<z.ZodEnum<{
        auto: "auto";
        gateway: "gateway";
        node: "node";
        sandbox: "sandbox";
      }>>;
      mode: z.ZodOptional<z.ZodEnum<{
        allowlist: "allowlist";
        ask: "ask";
        auto: "auto";
        deny: "deny";
        full: "full";
      }>>;
      security: z.ZodOptional<z.ZodEnum<{
        allowlist: "allowlist";
        deny: "deny";
        full: "full";
      }>>;
      ask: z.ZodOptional<z.ZodEnum<{
        always: "always";
        off: "off";
        "on-miss": "on-miss";
      }>>;
      node: z.ZodOptional<z.ZodString>;
      pathPrepend: z.ZodOptional<z.ZodArray<z.ZodString>>;
      safeBins: z.ZodOptional<z.ZodArray<z.ZodString>>;
      strictInlineEval: z.ZodOptional<z.ZodBoolean>;
      commandHighlighting: z.ZodOptional<z.ZodBoolean>;
      grantExpiryDays: z.ZodOptional<z.ZodNumber>;
      safeBinTrustedDirs: z.ZodOptional<z.ZodArray<z.ZodString>>;
      safeBinProfiles: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodObject<{
        minPositional: z.ZodOptional<z.ZodNumber>;
        maxPositional: z.ZodOptional<z.ZodNumber>;
        allowedValueFlags: z.ZodOptional<z.ZodArray<z.ZodString>>;
        deniedFlags: z.ZodOptional<z.ZodArray<z.ZodString>>;
      }, z.core.$strict>>>;
      reviewer: z.ZodOptional<z.ZodObject<{
        model: z.ZodOptional<z.ZodUnion<readonly [z.ZodString, z.ZodObject<{
          primary: z.ZodOptional<z.ZodString>;
          fallbacks: z.ZodOptional<z.ZodArray<z.ZodString>>;
        }, z.core.$strict>]>>;
        thinking: z.ZodOptional<z.ZodEnum<{
          high: "high";
          low: "low";
          max: "max";
          medium: "medium";
          minimal: "minimal";
          xhigh: "xhigh";
        }>>;
        fastMode: z.ZodOptional<z.ZodBoolean>;
        timeoutMs: z.ZodOptional<z.ZodNumber>;
      }, z.core.$strict>>;
      backgroundMs: z.ZodOptional<z.ZodNumber>;
      approvalRunningNoticeMs: z.ZodOptional<z.ZodNumber>;
      timeoutSeconds: z.ZodOptional<z.ZodNumber>;
      cleanupMs: z.ZodOptional<z.ZodNumber>;
      notifyOnExit: z.ZodOptional<z.ZodBoolean>;
      notifyOnExitEmptySuccess: z.ZodOptional<z.ZodBoolean>;
      applyPatch: z.ZodOptional<z.ZodObject<{
        enabled: z.ZodOptional<z.ZodBoolean>;
        workspaceOnly: z.ZodOptional<z.ZodBoolean>;
        allowModels: z.ZodOptional<z.ZodArray<z.ZodString>>;
      }, z.core.$strict>>;
    }, z.core.$strict>>;
    github: z.ZodOptional<z.ZodObject<{
      profileId: z.ZodString;
      kind: z.ZodOptional<z.ZodLiteral<"oauth">>;
      gitAuthor: z.ZodOptional<z.ZodObject<{
        name: z.ZodOptional<z.ZodString>;
        email: z.ZodOptional<z.ZodString>;
      }, z.core.$strict>>;
    }, z.core.$strict>>;
    fs: z.ZodOptional<z.ZodObject<{
      workspaceOnly: z.ZodOptional<z.ZodBoolean>;
    }, z.core.$strict>>;
    loopDetection: z.ZodOptional<z.ZodObject<{
      enabled: z.ZodOptional<z.ZodBoolean>;
    }, z.core.$strict>>;
    message: z.ZodOptional<z.ZodObject<{
      crossContext: z.ZodOptional<z.ZodObject<{
        allowWithinProvider: z.ZodOptional<z.ZodBoolean>;
        allowAcrossProviders: z.ZodOptional<z.ZodBoolean>;
        marker: z.ZodOptional<z.ZodObject<{
          enabled: z.ZodOptional<z.ZodBoolean>;
          prefix: z.ZodOptional<z.ZodString>;
          suffix: z.ZodOptional<z.ZodString>;
        }, z.core.$strict>>;
      }, z.core.$strict>>;
      actions: z.ZodOptional<z.ZodObject<{
        allow: z.ZodOptional<z.ZodArray<z.ZodString>>;
      }, z.core.$strict>>;
      broadcast: z.ZodOptional<z.ZodObject<{
        enabled: z.ZodOptional<z.ZodBoolean>;
      }, z.core.$strict>>;
    }, z.core.$strict>>;
    sandbox: z.ZodOptional<z.ZodObject<{
      tools: z.ZodOptional<z.ZodObject<{
        allow: z.ZodOptional<z.ZodArray<z.ZodString>>;
        alsoAllow: z.ZodOptional<z.ZodArray<z.ZodString>>;
        deny: z.ZodOptional<z.ZodArray<z.ZodString>>;
      }, z.core.$strict>>;
    }, z.core.$strict>>;
  }, z.core.$strict>>;
}, z.core.$strict>;
declare const ToolsSchema: z.ZodOptional<z.ZodObject<{
  profile: z.ZodOptional<z.ZodUnion<readonly [z.ZodLiteral<"minimal">, z.ZodLiteral<"coding">, z.ZodLiteral<"messaging">, z.ZodLiteral<"full">]>>;
  allow: z.ZodOptional<z.ZodArray<z.ZodString>>;
  alsoAllow: z.ZodOptional<z.ZodArray<z.ZodString>>;
  deny: z.ZodOptional<z.ZodArray<z.ZodString>>;
  byProvider: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodObject<{
    allow: z.ZodOptional<z.ZodArray<z.ZodString>>;
    alsoAllow: z.ZodOptional<z.ZodArray<z.ZodString>>;
    deny: z.ZodOptional<z.ZodArray<z.ZodString>>;
    profile: z.ZodOptional<z.ZodUnion<readonly [z.ZodLiteral<"minimal">, z.ZodLiteral<"coding">, z.ZodLiteral<"messaging">, z.ZodLiteral<"full">]>>;
  }, z.core.$strict>>>;
  toolsBySender: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodOptional<z.ZodObject<{
    allow: z.ZodOptional<z.ZodArray<z.ZodString>>;
    alsoAllow: z.ZodOptional<z.ZodArray<z.ZodString>>;
    deny: z.ZodOptional<z.ZodArray<z.ZodString>>;
  }, z.core.$strict>>>>;
  web: z.ZodOptional<z.ZodObject<{
    search: z.ZodOptional<z.ZodPreprocess<z.ZodObject<{
      enabled: z.ZodOptional<z.ZodBoolean>;
      provider: z.ZodOptional<z.ZodString>;
      maxResults: z.ZodOptional<z.ZodNumber>;
      timeoutSeconds: z.ZodOptional<z.ZodNumber>;
      cacheTtlMinutes: z.ZodOptional<z.ZodNumber>;
      openaiCodex: z.ZodOptional<z.ZodObject<{
        enabled: z.ZodOptional<z.ZodBoolean>;
        mode: z.ZodOptional<z.ZodUnion<readonly [z.ZodLiteral<"cached">, z.ZodLiteral<"live">]>>;
        allowedDomains: z.ZodOptional<z.ZodPipe<z.ZodArray<z.ZodString>, z.ZodTransform<string[] | undefined, string[]>>>;
        contextSize: z.ZodOptional<z.ZodUnion<readonly [z.ZodLiteral<"low">, z.ZodLiteral<"medium">, z.ZodLiteral<"high">]>>;
        userLocation: z.ZodOptional<z.ZodPipe<z.ZodObject<{
          country: z.ZodOptional<z.ZodPipe<z.ZodString, z.ZodTransform<string | undefined, string>>>;
          region: z.ZodOptional<z.ZodPipe<z.ZodString, z.ZodTransform<string | undefined, string>>>;
          city: z.ZodOptional<z.ZodPipe<z.ZodString, z.ZodTransform<string | undefined, string>>>;
          timezone: z.ZodOptional<z.ZodPipe<z.ZodString, z.ZodTransform<string | undefined, string>>>;
        }, z.core.$strict>, z.ZodTransform<{
          country?: string | undefined;
          region?: string | undefined;
          city?: string | undefined;
          timezone?: string | undefined;
        } | undefined, {
          country?: string | undefined;
          region?: string | undefined;
          city?: string | undefined;
          timezone?: string | undefined;
        }>>>;
      }, z.core.$strict>>;
    }, z.core.$catchall<z.ZodUnknown>>, unknown>>;
    fetch: z.ZodOptional<z.ZodObject<{
      enabled: z.ZodOptional<z.ZodBoolean>;
      provider: z.ZodOptional<z.ZodString>;
      maxChars: z.ZodOptional<z.ZodNumber>;
      maxCharsCap: z.ZodOptional<z.ZodNumber>;
      maxResponseBytes: z.ZodOptional<z.ZodNumber>;
      timeoutSeconds: z.ZodOptional<z.ZodNumber>;
      cacheTtlMinutes: z.ZodOptional<z.ZodNumber>;
      maxRedirects: z.ZodOptional<z.ZodNumber>;
      userAgent: z.ZodOptional<z.ZodString>;
      headers: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
      readability: z.ZodOptional<z.ZodBoolean>;
      useTrustedEnvProxy: z.ZodOptional<z.ZodBoolean>;
      ssrfPolicy: z.ZodOptional<z.ZodObject<{
        dangerouslyAllowPrivateNetwork: z.ZodOptional<z.ZodBoolean>;
        allowRfc2544BenchmarkRange: z.ZodOptional<z.ZodBoolean>;
        allowIpv6UniqueLocalRange: z.ZodOptional<z.ZodBoolean>;
        allowedHostnames: z.ZodOptional<z.ZodArray<z.ZodString>>;
        blockedHostnames: z.ZodOptional<z.ZodArray<z.ZodString>>;
      }, z.core.$strict>>;
    }, z.core.$strict>>;
  }, z.core.$strict>>;
  github: z.ZodOptional<z.ZodObject<{
    profileId: z.ZodString;
    kind: z.ZodOptional<z.ZodLiteral<"oauth">>;
    gitAuthor: z.ZodOptional<z.ZodObject<{
      name: z.ZodOptional<z.ZodString>;
      email: z.ZodOptional<z.ZodString>;
    }, z.core.$strict>>;
  }, z.core.$strict>>;
  media: z.ZodOptional<z.ZodObject<{
    models: z.ZodOptional<z.ZodArray<z.ZodOptional<z.ZodObject<{
      prompt: z.ZodOptional<z.ZodString>;
      timeoutSeconds: z.ZodOptional<z.ZodNumber>;
      language: z.ZodOptional<z.ZodString>;
      providerOptions: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodRecord<z.ZodString, z.ZodUnion<readonly [z.ZodString, z.ZodNumber, z.ZodBoolean]>>>>;
      baseUrl: z.ZodOptional<z.ZodString>;
      headers: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
      request: z.ZodOptional<z.ZodObject<{
        headers: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnion<readonly [z.ZodString, z.ZodDiscriminatedUnion<[z.ZodObject<{
          source: z.ZodLiteral<"env">;
          provider: z.ZodString;
          id: z.ZodString;
        }, z.core.$strict>, z.ZodObject<{
          source: z.ZodLiteral<"file">;
          provider: z.ZodString;
          id: z.ZodString;
        }, z.core.$strict>, z.ZodObject<{
          source: z.ZodLiteral<"exec">;
          provider: z.ZodString;
          id: z.ZodString;
        }, z.core.$strict>, z.ZodObject<{
          source: z.ZodLiteral<"store">;
          provider: z.ZodString;
          id: z.ZodString;
        }, z.core.$strict>], "source">]>>>;
        auth: z.ZodOptional<z.ZodUnion<readonly [z.ZodObject<{
          mode: z.ZodLiteral<"provider-default">;
        }, z.core.$strict>, z.ZodObject<{
          mode: z.ZodLiteral<"authorization-bearer">;
          token: z.ZodUnion<readonly [z.ZodString, z.ZodDiscriminatedUnion<[z.ZodObject<{
            source: z.ZodLiteral<"env">;
            provider: z.ZodString;
            id: z.ZodString;
          }, z.core.$strict>, z.ZodObject<{
            source: z.ZodLiteral<"file">;
            provider: z.ZodString;
            id: z.ZodString;
          }, z.core.$strict>, z.ZodObject<{
            source: z.ZodLiteral<"exec">;
            provider: z.ZodString;
            id: z.ZodString;
          }, z.core.$strict>, z.ZodObject<{
            source: z.ZodLiteral<"store">;
            provider: z.ZodString;
            id: z.ZodString;
          }, z.core.$strict>], "source">]>;
        }, z.core.$strict>, z.ZodObject<{
          mode: z.ZodLiteral<"header">;
          headerName: z.ZodString;
          value: z.ZodUnion<readonly [z.ZodString, z.ZodDiscriminatedUnion<[z.ZodObject<{
            source: z.ZodLiteral<"env">;
            provider: z.ZodString;
            id: z.ZodString;
          }, z.core.$strict>, z.ZodObject<{
            source: z.ZodLiteral<"file">;
            provider: z.ZodString;
            id: z.ZodString;
          }, z.core.$strict>, z.ZodObject<{
            source: z.ZodLiteral<"exec">;
            provider: z.ZodString;
            id: z.ZodString;
          }, z.core.$strict>, z.ZodObject<{
            source: z.ZodLiteral<"store">;
            provider: z.ZodString;
            id: z.ZodString;
          }, z.core.$strict>], "source">]>;
          prefix: z.ZodOptional<z.ZodString>;
        }, z.core.$strict>]>>;
        proxy: z.ZodOptional<z.ZodUnion<readonly [z.ZodObject<{
          mode: z.ZodLiteral<"env-proxy">;
          tls: z.ZodOptional<z.ZodObject<{
            ca: z.ZodOptional<z.ZodUnion<readonly [z.ZodString, z.ZodDiscriminatedUnion<[z.ZodObject<{
              source: z.ZodLiteral<"env">;
              provider: z.ZodString;
              id: z.ZodString;
            }, z.core.$strict>, z.ZodObject<{
              source: z.ZodLiteral<"file">;
              provider: z.ZodString;
              id: z.ZodString;
            }, z.core.$strict>, z.ZodObject<{
              source: z.ZodLiteral<"exec">;
              provider: z.ZodString;
              id: z.ZodString;
            }, z.core.$strict>, z.ZodObject<{
              source: z.ZodLiteral<"store">;
              provider: z.ZodString;
              id: z.ZodString;
            }, z.core.$strict>], "source">]>>;
            cert: z.ZodOptional<z.ZodUnion<readonly [z.ZodString, z.ZodDiscriminatedUnion<[z.ZodObject<{
              source: z.ZodLiteral<"env">;
              provider: z.ZodString;
              id: z.ZodString;
            }, z.core.$strict>, z.ZodObject<{
              source: z.ZodLiteral<"file">;
              provider: z.ZodString;
              id: z.ZodString;
            }, z.core.$strict>, z.ZodObject<{
              source: z.ZodLiteral<"exec">;
              provider: z.ZodString;
              id: z.ZodString;
            }, z.core.$strict>, z.ZodObject<{
              source: z.ZodLiteral<"store">;
              provider: z.ZodString;
              id: z.ZodString;
            }, z.core.$strict>], "source">]>>;
            key: z.ZodOptional<z.ZodUnion<readonly [z.ZodString, z.ZodDiscriminatedUnion<[z.ZodObject<{
              source: z.ZodLiteral<"env">;
              provider: z.ZodString;
              id: z.ZodString;
            }, z.core.$strict>, z.ZodObject<{
              source: z.ZodLiteral<"file">;
              provider: z.ZodString;
              id: z.ZodString;
            }, z.core.$strict>, z.ZodObject<{
              source: z.ZodLiteral<"exec">;
              provider: z.ZodString;
              id: z.ZodString;
            }, z.core.$strict>, z.ZodObject<{
              source: z.ZodLiteral<"store">;
              provider: z.ZodString;
              id: z.ZodString;
            }, z.core.$strict>], "source">]>>;
            passphrase: z.ZodOptional<z.ZodUnion<readonly [z.ZodString, z.ZodDiscriminatedUnion<[z.ZodObject<{
              source: z.ZodLiteral<"env">;
              provider: z.ZodString;
              id: z.ZodString;
            }, z.core.$strict>, z.ZodObject<{
              source: z.ZodLiteral<"file">;
              provider: z.ZodString;
              id: z.ZodString;
            }, z.core.$strict>, z.ZodObject<{
              source: z.ZodLiteral<"exec">;
              provider: z.ZodString;
              id: z.ZodString;
            }, z.core.$strict>, z.ZodObject<{
              source: z.ZodLiteral<"store">;
              provider: z.ZodString;
              id: z.ZodString;
            }, z.core.$strict>], "source">]>>;
            serverName: z.ZodOptional<z.ZodString>;
            insecureSkipVerify: z.ZodOptional<z.ZodBoolean>;
          }, z.core.$strict>>;
        }, z.core.$strict>, z.ZodObject<{
          mode: z.ZodLiteral<"explicit-proxy">;
          url: z.ZodString;
          tls: z.ZodOptional<z.ZodObject<{
            ca: z.ZodOptional<z.ZodUnion<readonly [z.ZodString, z.ZodDiscriminatedUnion<[z.ZodObject<{
              source: z.ZodLiteral<"env">;
              provider: z.ZodString;
              id: z.ZodString;
            }, z.core.$strict>, z.ZodObject<{
              source: z.ZodLiteral<"file">;
              provider: z.ZodString;
              id: z.ZodString;
            }, z.core.$strict>, z.ZodObject<{
              source: z.ZodLiteral<"exec">;
              provider: z.ZodString;
              id: z.ZodString;
            }, z.core.$strict>, z.ZodObject<{
              source: z.ZodLiteral<"store">;
              provider: z.ZodString;
              id: z.ZodString;
            }, z.core.$strict>], "source">]>>;
            cert: z.ZodOptional<z.ZodUnion<readonly [z.ZodString, z.ZodDiscriminatedUnion<[z.ZodObject<{
              source: z.ZodLiteral<"env">;
              provider: z.ZodString;
              id: z.ZodString;
            }, z.core.$strict>, z.ZodObject<{
              source: z.ZodLiteral<"file">;
              provider: z.ZodString;
              id: z.ZodString;
            }, z.core.$strict>, z.ZodObject<{
              source: z.ZodLiteral<"exec">;
              provider: z.ZodString;
              id: z.ZodString;
            }, z.core.$strict>, z.ZodObject<{
              source: z.ZodLiteral<"store">;
              provider: z.ZodString;
              id: z.ZodString;
            }, z.core.$strict>], "source">]>>;
            key: z.ZodOptional<z.ZodUnion<readonly [z.ZodString, z.ZodDiscriminatedUnion<[z.ZodObject<{
              source: z.ZodLiteral<"env">;
              provider: z.ZodString;
              id: z.ZodString;
            }, z.core.$strict>, z.ZodObject<{
              source: z.ZodLiteral<"file">;
              provider: z.ZodString;
              id: z.ZodString;
            }, z.core.$strict>, z.ZodObject<{
              source: z.ZodLiteral<"exec">;
              provider: z.ZodString;
              id: z.ZodString;
            }, z.core.$strict>, z.ZodObject<{
              source: z.ZodLiteral<"store">;
              provider: z.ZodString;
              id: z.ZodString;
            }, z.core.$strict>], "source">]>>;
            passphrase: z.ZodOptional<z.ZodUnion<readonly [z.ZodString, z.ZodDiscriminatedUnion<[z.ZodObject<{
              source: z.ZodLiteral<"env">;
              provider: z.ZodString;
              id: z.ZodString;
            }, z.core.$strict>, z.ZodObject<{
              source: z.ZodLiteral<"file">;
              provider: z.ZodString;
              id: z.ZodString;
            }, z.core.$strict>, z.ZodObject<{
              source: z.ZodLiteral<"exec">;
              provider: z.ZodString;
              id: z.ZodString;
            }, z.core.$strict>, z.ZodObject<{
              source: z.ZodLiteral<"store">;
              provider: z.ZodString;
              id: z.ZodString;
            }, z.core.$strict>], "source">]>>;
            serverName: z.ZodOptional<z.ZodString>;
            insecureSkipVerify: z.ZodOptional<z.ZodBoolean>;
          }, z.core.$strict>>;
        }, z.core.$strict>]>>;
        tls: z.ZodOptional<z.ZodObject<{
          ca: z.ZodOptional<z.ZodUnion<readonly [z.ZodString, z.ZodDiscriminatedUnion<[z.ZodObject<{
            source: z.ZodLiteral<"env">;
            provider: z.ZodString;
            id: z.ZodString;
          }, z.core.$strict>, z.ZodObject<{
            source: z.ZodLiteral<"file">;
            provider: z.ZodString;
            id: z.ZodString;
          }, z.core.$strict>, z.ZodObject<{
            source: z.ZodLiteral<"exec">;
            provider: z.ZodString;
            id: z.ZodString;
          }, z.core.$strict>, z.ZodObject<{
            source: z.ZodLiteral<"store">;
            provider: z.ZodString;
            id: z.ZodString;
          }, z.core.$strict>], "source">]>>;
          cert: z.ZodOptional<z.ZodUnion<readonly [z.ZodString, z.ZodDiscriminatedUnion<[z.ZodObject<{
            source: z.ZodLiteral<"env">;
            provider: z.ZodString;
            id: z.ZodString;
          }, z.core.$strict>, z.ZodObject<{
            source: z.ZodLiteral<"file">;
            provider: z.ZodString;
            id: z.ZodString;
          }, z.core.$strict>, z.ZodObject<{
            source: z.ZodLiteral<"exec">;
            provider: z.ZodString;
            id: z.ZodString;
          }, z.core.$strict>, z.ZodObject<{
            source: z.ZodLiteral<"store">;
            provider: z.ZodString;
            id: z.ZodString;
          }, z.core.$strict>], "source">]>>;
          key: z.ZodOptional<z.ZodUnion<readonly [z.ZodString, z.ZodDiscriminatedUnion<[z.ZodObject<{
            source: z.ZodLiteral<"env">;
            provider: z.ZodString;
            id: z.ZodString;
          }, z.core.$strict>, z.ZodObject<{
            source: z.ZodLiteral<"file">;
            provider: z.ZodString;
            id: z.ZodString;
          }, z.core.$strict>, z.ZodObject<{
            source: z.ZodLiteral<"exec">;
            provider: z.ZodString;
            id: z.ZodString;
          }, z.core.$strict>, z.ZodObject<{
            source: z.ZodLiteral<"store">;
            provider: z.ZodString;
            id: z.ZodString;
          }, z.core.$strict>], "source">]>>;
          passphrase: z.ZodOptional<z.ZodUnion<readonly [z.ZodString, z.ZodDiscriminatedUnion<[z.ZodObject<{
            source: z.ZodLiteral<"env">;
            provider: z.ZodString;
            id: z.ZodString;
          }, z.core.$strict>, z.ZodObject<{
            source: z.ZodLiteral<"file">;
            provider: z.ZodString;
            id: z.ZodString;
          }, z.core.$strict>, z.ZodObject<{
            source: z.ZodLiteral<"exec">;
            provider: z.ZodString;
            id: z.ZodString;
          }, z.core.$strict>, z.ZodObject<{
            source: z.ZodLiteral<"store">;
            provider: z.ZodString;
            id: z.ZodString;
          }, z.core.$strict>], "source">]>>;
          serverName: z.ZodOptional<z.ZodString>;
          insecureSkipVerify: z.ZodOptional<z.ZodBoolean>;
        }, z.core.$strict>>;
      }, z.core.$strict>>;
      provider: z.ZodOptional<z.ZodString>;
      model: z.ZodOptional<z.ZodString>;
      capabilities: z.ZodOptional<z.ZodArray<z.ZodUnion<readonly [z.ZodLiteral<"image">, z.ZodLiteral<"audio">, z.ZodLiteral<"video">]>>>;
      type: z.ZodOptional<z.ZodUnion<readonly [z.ZodLiteral<"provider">, z.ZodLiteral<"cli">]>>;
      command: z.ZodOptional<z.ZodString>;
      args: z.ZodOptional<z.ZodArray<z.ZodString>>;
      maxChars: z.ZodOptional<z.ZodNumber>;
      maxBytes: z.ZodOptional<z.ZodNumber>;
      profile: z.ZodOptional<z.ZodString>;
      preferredProfile: z.ZodOptional<z.ZodString>;
    }, z.core.$strict>>>>;
    concurrency: z.ZodOptional<z.ZodNumber>;
    image: z.ZodOptional<z.ZodOptional<z.ZodObject<{
      prompt: z.ZodOptional<z.ZodString>;
      timeoutSeconds: z.ZodOptional<z.ZodNumber>;
      language: z.ZodOptional<z.ZodString>;
      providerOptions: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodRecord<z.ZodString, z.ZodUnion<readonly [z.ZodString, z.ZodNumber, z.ZodBoolean]>>>>;
      baseUrl: z.ZodOptional<z.ZodString>;
      headers: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
      request: z.ZodOptional<z.ZodObject<{
        headers: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnion<readonly [z.ZodString, z.ZodDiscriminatedUnion<[z.ZodObject<{
          source: z.ZodLiteral<"env">;
          provider: z.ZodString;
          id: z.ZodString;
        }, z.core.$strict>, z.ZodObject<{
          source: z.ZodLiteral<"file">;
          provider: z.ZodString;
          id: z.ZodString;
        }, z.core.$strict>, z.ZodObject<{
          source: z.ZodLiteral<"exec">;
          provider: z.ZodString;
          id: z.ZodString;
        }, z.core.$strict>, z.ZodObject<{
          source: z.ZodLiteral<"store">;
          provider: z.ZodString;
          id: z.ZodString;
        }, z.core.$strict>], "source">]>>>;
        auth: z.ZodOptional<z.ZodUnion<readonly [z.ZodObject<{
          mode: z.ZodLiteral<"provider-default">;
        }, z.core.$strict>, z.ZodObject<{
          mode: z.ZodLiteral<"authorization-bearer">;
          token: z.ZodUnion<readonly [z.ZodString, z.ZodDiscriminatedUnion<[z.ZodObject<{
            source: z.ZodLiteral<"env">;
            provider: z.ZodString;
            id: z.ZodString;
          }, z.core.$strict>, z.ZodObject<{
            source: z.ZodLiteral<"file">;
            provider: z.ZodString;
            id: z.ZodString;
          }, z.core.$strict>, z.ZodObject<{
            source: z.ZodLiteral<"exec">;
            provider: z.ZodString;
            id: z.ZodString;
          }, z.core.$strict>, z.ZodObject<{
            source: z.ZodLiteral<"store">;
            provider: z.ZodString;
            id: z.ZodString;
          }, z.core.$strict>], "source">]>;
        }, z.core.$strict>, z.ZodObject<{
          mode: z.ZodLiteral<"header">;
          headerName: z.ZodString;
          value: z.ZodUnion<readonly [z.ZodString, z.ZodDiscriminatedUnion<[z.ZodObject<{
            source: z.ZodLiteral<"env">;
            provider: z.ZodString;
            id: z.ZodString;
          }, z.core.$strict>, z.ZodObject<{
            source: z.ZodLiteral<"file">;
            provider: z.ZodString;
            id: z.ZodString;
          }, z.core.$strict>, z.ZodObject<{
            source: z.ZodLiteral<"exec">;
            provider: z.ZodString;
            id: z.ZodString;
          }, z.core.$strict>, z.ZodObject<{
            source: z.ZodLiteral<"store">;
            provider: z.ZodString;
            id: z.ZodString;
          }, z.core.$strict>], "source">]>;
          prefix: z.ZodOptional<z.ZodString>;
        }, z.core.$strict>]>>;
        proxy: z.ZodOptional<z.ZodUnion<readonly [z.ZodObject<{
          mode: z.ZodLiteral<"env-proxy">;
          tls: z.ZodOptional<z.ZodObject<{
            ca: z.ZodOptional<z.ZodUnion<readonly [z.ZodString, z.ZodDiscriminatedUnion<[z.ZodObject<{
              source: z.ZodLiteral<"env">;
              provider: z.ZodString;
              id: z.ZodString;
            }, z.core.$strict>, z.ZodObject<{
              source: z.ZodLiteral<"file">;
              provider: z.ZodString;
              id: z.ZodString;
            }, z.core.$strict>, z.ZodObject<{
              source: z.ZodLiteral<"exec">;
              provider: z.ZodString;
              id: z.ZodString;
            }, z.core.$strict>, z.ZodObject<{
              source: z.ZodLiteral<"store">;
              provider: z.ZodString;
              id: z.ZodString;
            }, z.core.$strict>], "source">]>>;
            cert: z.ZodOptional<z.ZodUnion<readonly [z.ZodString, z.ZodDiscriminatedUnion<[z.ZodObject<{
              source: z.ZodLiteral<"env">;
              provider: z.ZodString;
              id: z.ZodString;
            }, z.core.$strict>, z.ZodObject<{
              source: z.ZodLiteral<"file">;
              provider: z.ZodString;
              id: z.ZodString;
            }, z.core.$strict>, z.ZodObject<{
              source: z.ZodLiteral<"exec">;
              provider: z.ZodString;
              id: z.ZodString;
            }, z.core.$strict>, z.ZodObject<{
              source: z.ZodLiteral<"store">;
              provider: z.ZodString;
              id: z.ZodString;
            }, z.core.$strict>], "source">]>>;
            key: z.ZodOptional<z.ZodUnion<readonly [z.ZodString, z.ZodDiscriminatedUnion<[z.ZodObject<{
              source: z.ZodLiteral<"env">;
              provider: z.ZodString;
              id: z.ZodString;
            }, z.core.$strict>, z.ZodObject<{
              source: z.ZodLiteral<"file">;
              provider: z.ZodString;
              id: z.ZodString;
            }, z.core.$strict>, z.ZodObject<{
              source: z.ZodLiteral<"exec">;
              provider: z.ZodString;
              id: z.ZodString;
            }, z.core.$strict>, z.ZodObject<{
              source: z.ZodLiteral<"store">;
              provider: z.ZodString;
              id: z.ZodString;
            }, z.core.$strict>], "source">]>>;
            passphrase: z.ZodOptional<z.ZodUnion<readonly [z.ZodString, z.ZodDiscriminatedUnion<[z.ZodObject<{
              source: z.ZodLiteral<"env">;
              provider: z.ZodString;
              id: z.ZodString;
            }, z.core.$strict>, z.ZodObject<{
              source: z.ZodLiteral<"file">;
              provider: z.ZodString;
              id: z.ZodString;
            }, z.core.$strict>, z.ZodObject<{
              source: z.ZodLiteral<"exec">;
              provider: z.ZodString;
              id: z.ZodString;
            }, z.core.$strict>, z.ZodObject<{
              source: z.ZodLiteral<"store">;
              provider: z.ZodString;
              id: z.ZodString;
            }, z.core.$strict>], "source">]>>;
            serverName: z.ZodOptional<z.ZodString>;
            insecureSkipVerify: z.ZodOptional<z.ZodBoolean>;
          }, z.core.$strict>>;
        }, z.core.$strict>, z.ZodObject<{
          mode: z.ZodLiteral<"explicit-proxy">;
          url: z.ZodString;
          tls: z.ZodOptional<z.ZodObject<{
            ca: z.ZodOptional<z.ZodUnion<readonly [z.ZodString, z.ZodDiscriminatedUnion<[z.ZodObject<{
              source: z.ZodLiteral<"env">;
              provider: z.ZodString;
              id: z.ZodString;
            }, z.core.$strict>, z.ZodObject<{
              source: z.ZodLiteral<"file">;
              provider: z.ZodString;
              id: z.ZodString;
            }, z.core.$strict>, z.ZodObject<{
              source: z.ZodLiteral<"exec">;
              provider: z.ZodString;
              id: z.ZodString;
            }, z.core.$strict>, z.ZodObject<{
              source: z.ZodLiteral<"store">;
              provider: z.ZodString;
              id: z.ZodString;
            }, z.core.$strict>], "source">]>>;
            cert: z.ZodOptional<z.ZodUnion<readonly [z.ZodString, z.ZodDiscriminatedUnion<[z.ZodObject<{
              source: z.ZodLiteral<"env">;
              provider: z.ZodString;
              id: z.ZodString;
            }, z.core.$strict>, z.ZodObject<{
              source: z.ZodLiteral<"file">;
              provider: z.ZodString;
              id: z.ZodString;
            }, z.core.$strict>, z.ZodObject<{
              source: z.ZodLiteral<"exec">;
              provider: z.ZodString;
              id: z.ZodString;
            }, z.core.$strict>, z.ZodObject<{
              source: z.ZodLiteral<"store">;
              provider: z.ZodString;
              id: z.ZodString;
            }, z.core.$strict>], "source">]>>;
            key: z.ZodOptional<z.ZodUnion<readonly [z.ZodString, z.ZodDiscriminatedUnion<[z.ZodObject<{
              source: z.ZodLiteral<"env">;
              provider: z.ZodString;
              id: z.ZodString;
            }, z.core.$strict>, z.ZodObject<{
              source: z.ZodLiteral<"file">;
              provider: z.ZodString;
              id: z.ZodString;
            }, z.core.$strict>, z.ZodObject<{
              source: z.ZodLiteral<"exec">;
              provider: z.ZodString;
              id: z.ZodString;
            }, z.core.$strict>, z.ZodObject<{
              source: z.ZodLiteral<"store">;
              provider: z.ZodString;
              id: z.ZodString;
            }, z.core.$strict>], "source">]>>;
            passphrase: z.ZodOptional<z.ZodUnion<readonly [z.ZodString, z.ZodDiscriminatedUnion<[z.ZodObject<{
              source: z.ZodLiteral<"env">;
              provider: z.ZodString;
              id: z.ZodString;
            }, z.core.$strict>, z.ZodObject<{
              source: z.ZodLiteral<"file">;
              provider: z.ZodString;
              id: z.ZodString;
            }, z.core.$strict>, z.ZodObject<{
              source: z.ZodLiteral<"exec">;
              provider: z.ZodString;
              id: z.ZodString;
            }, z.core.$strict>, z.ZodObject<{
              source: z.ZodLiteral<"store">;
              provider: z.ZodString;
              id: z.ZodString;
            }, z.core.$strict>], "source">]>>;
            serverName: z.ZodOptional<z.ZodString>;
            insecureSkipVerify: z.ZodOptional<z.ZodBoolean>;
          }, z.core.$strict>>;
        }, z.core.$strict>]>>;
        tls: z.ZodOptional<z.ZodObject<{
          ca: z.ZodOptional<z.ZodUnion<readonly [z.ZodString, z.ZodDiscriminatedUnion<[z.ZodObject<{
            source: z.ZodLiteral<"env">;
            provider: z.ZodString;
            id: z.ZodString;
          }, z.core.$strict>, z.ZodObject<{
            source: z.ZodLiteral<"file">;
            provider: z.ZodString;
            id: z.ZodString;
          }, z.core.$strict>, z.ZodObject<{
            source: z.ZodLiteral<"exec">;
            provider: z.ZodString;
            id: z.ZodString;
          }, z.core.$strict>, z.ZodObject<{
            source: z.ZodLiteral<"store">;
            provider: z.ZodString;
            id: z.ZodString;
          }, z.core.$strict>], "source">]>>;
          cert: z.ZodOptional<z.ZodUnion<readonly [z.ZodString, z.ZodDiscriminatedUnion<[z.ZodObject<{
            source: z.ZodLiteral<"env">;
            provider: z.ZodString;
            id: z.ZodString;
          }, z.core.$strict>, z.ZodObject<{
            source: z.ZodLiteral<"file">;
            provider: z.ZodString;
            id: z.ZodString;
          }, z.core.$strict>, z.ZodObject<{
            source: z.ZodLiteral<"exec">;
            provider: z.ZodString;
            id: z.ZodString;
          }, z.core.$strict>, z.ZodObject<{
            source: z.ZodLiteral<"store">;
            provider: z.ZodString;
            id: z.ZodString;
          }, z.core.$strict>], "source">]>>;
          key: z.ZodOptional<z.ZodUnion<readonly [z.ZodString, z.ZodDiscriminatedUnion<[z.ZodObject<{
            source: z.ZodLiteral<"env">;
            provider: z.ZodString;
            id: z.ZodString;
          }, z.core.$strict>, z.ZodObject<{
            source: z.ZodLiteral<"file">;
            provider: z.ZodString;
            id: z.ZodString;
          }, z.core.$strict>, z.ZodObject<{
            source: z.ZodLiteral<"exec">;
            provider: z.ZodString;
            id: z.ZodString;
          }, z.core.$strict>, z.ZodObject<{
            source: z.ZodLiteral<"store">;
            provider: z.ZodString;
            id: z.ZodString;
          }, z.core.$strict>], "source">]>>;
          passphrase: z.ZodOptional<z.ZodUnion<readonly [z.ZodString, z.ZodDiscriminatedUnion<[z.ZodObject<{
            source: z.ZodLiteral<"env">;
            provider: z.ZodString;
            id: z.ZodString;
          }, z.core.$strict>, z.ZodObject<{
            source: z.ZodLiteral<"file">;
            provider: z.ZodString;
            id: z.ZodString;
          }, z.core.$strict>, z.ZodObject<{
            source: z.ZodLiteral<"exec">;
            provider: z.ZodString;
            id: z.ZodString;
          }, z.core.$strict>, z.ZodObject<{
            source: z.ZodLiteral<"store">;
            provider: z.ZodString;
            id: z.ZodString;
          }, z.core.$strict>], "source">]>>;
          serverName: z.ZodOptional<z.ZodString>;
          insecureSkipVerify: z.ZodOptional<z.ZodBoolean>;
        }, z.core.$strict>>;
      }, z.core.$strict>>;
      enabled: z.ZodOptional<z.ZodBoolean>;
      preferredModel: z.ZodOptional<z.ZodString>;
      scope: z.ZodOptional<z.ZodObject<{
        default: z.ZodOptional<z.ZodUnion<readonly [z.ZodLiteral<"allow">, z.ZodLiteral<"deny">]>>;
        rules: z.ZodOptional<z.ZodArray<z.ZodObject<{
          action: z.ZodUnion<readonly [z.ZodLiteral<"allow">, z.ZodLiteral<"deny">]>;
          match: z.ZodOptional<z.ZodObject<{
            channel: z.ZodOptional<z.ZodString>;
            chatType: z.ZodOptional<z.ZodUnion<readonly [z.ZodLiteral<"direct">, z.ZodLiteral<"group">, z.ZodLiteral<"channel">]>>;
            keyPrefix: z.ZodOptional<z.ZodString>;
            rawKeyPrefix: z.ZodOptional<z.ZodString>;
          }, z.core.$strict>>;
        }, z.core.$strict>>>;
      }, z.core.$strict>>;
      maxBytes: z.ZodOptional<z.ZodNumber>;
      maxChars: z.ZodOptional<z.ZodNumber>;
      attachments: z.ZodOptional<z.ZodObject<{
        mode: z.ZodOptional<z.ZodUnion<readonly [z.ZodLiteral<"first">, z.ZodLiteral<"all">]>>;
        maxAttachments: z.ZodOptional<z.ZodNumber>;
        prefer: z.ZodOptional<z.ZodUnion<readonly [z.ZodLiteral<"first">, z.ZodLiteral<"last">, z.ZodLiteral<"path">, z.ZodLiteral<"url">]>>;
      }, z.core.$strict>>;
    }, z.core.$strict>>>;
    audio: z.ZodOptional<z.ZodOptional<z.ZodObject<{
      prompt: z.ZodOptional<z.ZodString>;
      timeoutSeconds: z.ZodOptional<z.ZodNumber>;
      language: z.ZodOptional<z.ZodString>;
      providerOptions: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodRecord<z.ZodString, z.ZodUnion<readonly [z.ZodString, z.ZodNumber, z.ZodBoolean]>>>>;
      baseUrl: z.ZodOptional<z.ZodString>;
      headers: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
      request: z.ZodOptional<z.ZodObject<{
        headers: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnion<readonly [z.ZodString, z.ZodDiscriminatedUnion<[z.ZodObject<{
          source: z.ZodLiteral<"env">;
          provider: z.ZodString;
          id: z.ZodString;
        }, z.core.$strict>, z.ZodObject<{
          source: z.ZodLiteral<"file">;
          provider: z.ZodString;
          id: z.ZodString;
        }, z.core.$strict>, z.ZodObject<{
          source: z.ZodLiteral<"exec">;
          provider: z.ZodString;
          id: z.ZodString;
        }, z.core.$strict>, z.ZodObject<{
          source: z.ZodLiteral<"store">;
          provider: z.ZodString;
          id: z.ZodString;
        }, z.core.$strict>], "source">]>>>;
        auth: z.ZodOptional<z.ZodUnion<readonly [z.ZodObject<{
          mode: z.ZodLiteral<"provider-default">;
        }, z.core.$strict>, z.ZodObject<{
          mode: z.ZodLiteral<"authorization-bearer">;
          token: z.ZodUnion<readonly [z.ZodString, z.ZodDiscriminatedUnion<[z.ZodObject<{
            source: z.ZodLiteral<"env">;
            provider: z.ZodString;
            id: z.ZodString;
          }, z.core.$strict>, z.ZodObject<{
            source: z.ZodLiteral<"file">;
            provider: z.ZodString;
            id: z.ZodString;
          }, z.core.$strict>, z.ZodObject<{
            source: z.ZodLiteral<"exec">;
            provider: z.ZodString;
            id: z.ZodString;
          }, z.core.$strict>, z.ZodObject<{
            source: z.ZodLiteral<"store">;
            provider: z.ZodString;
            id: z.ZodString;
          }, z.core.$strict>], "source">]>;
        }, z.core.$strict>, z.ZodObject<{
          mode: z.ZodLiteral<"header">;
          headerName: z.ZodString;
          value: z.ZodUnion<readonly [z.ZodString, z.ZodDiscriminatedUnion<[z.ZodObject<{
            source: z.ZodLiteral<"env">;
            provider: z.ZodString;
            id: z.ZodString;
          }, z.core.$strict>, z.ZodObject<{
            source: z.ZodLiteral<"file">;
            provider: z.ZodString;
            id: z.ZodString;
          }, z.core.$strict>, z.ZodObject<{
            source: z.ZodLiteral<"exec">;
            provider: z.ZodString;
            id: z.ZodString;
          }, z.core.$strict>, z.ZodObject<{
            source: z.ZodLiteral<"store">;
            provider: z.ZodString;
            id: z.ZodString;
          }, z.core.$strict>], "source">]>;
          prefix: z.ZodOptional<z.ZodString>;
        }, z.core.$strict>]>>;
        proxy: z.ZodOptional<z.ZodUnion<readonly [z.ZodObject<{
          mode: z.ZodLiteral<"env-proxy">;
          tls: z.ZodOptional<z.ZodObject<{
            ca: z.ZodOptional<z.ZodUnion<readonly [z.ZodString, z.ZodDiscriminatedUnion<[z.ZodObject<{
              source: z.ZodLiteral<"env">;
              provider: z.ZodString;
              id: z.ZodString;
            }, z.core.$strict>, z.ZodObject<{
              source: z.ZodLiteral<"file">;
              provider: z.ZodString;
              id: z.ZodString;
            }, z.core.$strict>, z.ZodObject<{
              source: z.ZodLiteral<"exec">;
              provider: z.ZodString;
              id: z.ZodString;
            }, z.core.$strict>, z.ZodObject<{
              source: z.ZodLiteral<"store">;
              provider: z.ZodString;
              id: z.ZodString;
            }, z.core.$strict>], "source">]>>;
            cert: z.ZodOptional<z.ZodUnion<readonly [z.ZodString, z.ZodDiscriminatedUnion<[z.ZodObject<{
              source: z.ZodLiteral<"env">;
              provider: z.ZodString;
              id: z.ZodString;
            }, z.core.$strict>, z.ZodObject<{
              source: z.ZodLiteral<"file">;
              provider: z.ZodString;
              id: z.ZodString;
            }, z.core.$strict>, z.ZodObject<{
              source: z.ZodLiteral<"exec">;
              provider: z.ZodString;
              id: z.ZodString;
            }, z.core.$strict>, z.ZodObject<{
              source: z.ZodLiteral<"store">;
              provider: z.ZodString;
              id: z.ZodString;
            }, z.core.$strict>], "source">]>>;
            key: z.ZodOptional<z.ZodUnion<readonly [z.ZodString, z.ZodDiscriminatedUnion<[z.ZodObject<{
              source: z.ZodLiteral<"env">;
              provider: z.ZodString;
              id: z.ZodString;
            }, z.core.$strict>, z.ZodObject<{
              source: z.ZodLiteral<"file">;
              provider: z.ZodString;
              id: z.ZodString;
            }, z.core.$strict>, z.ZodObject<{
              source: z.ZodLiteral<"exec">;
              provider: z.ZodString;
              id: z.ZodString;
            }, z.core.$strict>, z.ZodObject<{
              source: z.ZodLiteral<"store">;
              provider: z.ZodString;
              id: z.ZodString;
            }, z.core.$strict>], "source">]>>;
            passphrase: z.ZodOptional<z.ZodUnion<readonly [z.ZodString, z.ZodDiscriminatedUnion<[z.ZodObject<{
              source: z.ZodLiteral<"env">;
              provider: z.ZodString;
              id: z.ZodString;
            }, z.core.$strict>, z.ZodObject<{
              source: z.ZodLiteral<"file">;
              provider: z.ZodString;
              id: z.ZodString;
            }, z.core.$strict>, z.ZodObject<{
              source: z.ZodLiteral<"exec">;
              provider: z.ZodString;
              id: z.ZodString;
            }, z.core.$strict>, z.ZodObject<{
              source: z.ZodLiteral<"store">;
              provider: z.ZodString;
              id: z.ZodString;
            }, z.core.$strict>], "source">]>>;
            serverName: z.ZodOptional<z.ZodString>;
            insecureSkipVerify: z.ZodOptional<z.ZodBoolean>;
          }, z.core.$strict>>;
        }, z.core.$strict>, z.ZodObject<{
          mode: z.ZodLiteral<"explicit-proxy">;
          url: z.ZodString;
          tls: z.ZodOptional<z.ZodObject<{
            ca: z.ZodOptional<z.ZodUnion<readonly [z.ZodString, z.ZodDiscriminatedUnion<[z.ZodObject<{
              source: z.ZodLiteral<"env">;
              provider: z.ZodString;
              id: z.ZodString;
            }, z.core.$strict>, z.ZodObject<{
              source: z.ZodLiteral<"file">;
              provider: z.ZodString;
              id: z.ZodString;
            }, z.core.$strict>, z.ZodObject<{
              source: z.ZodLiteral<"exec">;
              provider: z.ZodString;
              id: z.ZodString;
            }, z.core.$strict>, z.ZodObject<{
              source: z.ZodLiteral<"store">;
              provider: z.ZodString;
              id: z.ZodString;
            }, z.core.$strict>], "source">]>>;
            cert: z.ZodOptional<z.ZodUnion<readonly [z.ZodString, z.ZodDiscriminatedUnion<[z.ZodObject<{
              source: z.ZodLiteral<"env">;
              provider: z.ZodString;
              id: z.ZodString;
            }, z.core.$strict>, z.ZodObject<{
              source: z.ZodLiteral<"file">;
              provider: z.ZodString;
              id: z.ZodString;
            }, z.core.$strict>, z.ZodObject<{
              source: z.ZodLiteral<"exec">;
              provider: z.ZodString;
              id: z.ZodString;
            }, z.core.$strict>, z.ZodObject<{
              source: z.ZodLiteral<"store">;
              provider: z.ZodString;
              id: z.ZodString;
            }, z.core.$strict>], "source">]>>;
            key: z.ZodOptional<z.ZodUnion<readonly [z.ZodString, z.ZodDiscriminatedUnion<[z.ZodObject<{
              source: z.ZodLiteral<"env">;
              provider: z.ZodString;
              id: z.ZodString;
            }, z.core.$strict>, z.ZodObject<{
              source: z.ZodLiteral<"file">;
              provider: z.ZodString;
              id: z.ZodString;
            }, z.core.$strict>, z.ZodObject<{
              source: z.ZodLiteral<"exec">;
              provider: z.ZodString;
              id: z.ZodString;
            }, z.core.$strict>, z.ZodObject<{
              source: z.ZodLiteral<"store">;
              provider: z.ZodString;
              id: z.ZodString;
            }, z.core.$strict>], "source">]>>;
            passphrase: z.ZodOptional<z.ZodUnion<readonly [z.ZodString, z.ZodDiscriminatedUnion<[z.ZodObject<{
              source: z.ZodLiteral<"env">;
              provider: z.ZodString;
              id: z.ZodString;
            }, z.core.$strict>, z.ZodObject<{
              source: z.ZodLiteral<"file">;
              provider: z.ZodString;
              id: z.ZodString;
            }, z.core.$strict>, z.ZodObject<{
              source: z.ZodLiteral<"exec">;
              provider: z.ZodString;
              id: z.ZodString;
            }, z.core.$strict>, z.ZodObject<{
              source: z.ZodLiteral<"store">;
              provider: z.ZodString;
              id: z.ZodString;
            }, z.core.$strict>], "source">]>>;
            serverName: z.ZodOptional<z.ZodString>;
            insecureSkipVerify: z.ZodOptional<z.ZodBoolean>;
          }, z.core.$strict>>;
        }, z.core.$strict>]>>;
        tls: z.ZodOptional<z.ZodObject<{
          ca: z.ZodOptional<z.ZodUnion<readonly [z.ZodString, z.ZodDiscriminatedUnion<[z.ZodObject<{
            source: z.ZodLiteral<"env">;
            provider: z.ZodString;
            id: z.ZodString;
          }, z.core.$strict>, z.ZodObject<{
            source: z.ZodLiteral<"file">;
            provider: z.ZodString;
            id: z.ZodString;
          }, z.core.$strict>, z.ZodObject<{
            source: z.ZodLiteral<"exec">;
            provider: z.ZodString;
            id: z.ZodString;
          }, z.core.$strict>, z.ZodObject<{
            source: z.ZodLiteral<"store">;
            provider: z.ZodString;
            id: z.ZodString;
          }, z.core.$strict>], "source">]>>;
          cert: z.ZodOptional<z.ZodUnion<readonly [z.ZodString, z.ZodDiscriminatedUnion<[z.ZodObject<{
            source: z.ZodLiteral<"env">;
            provider: z.ZodString;
            id: z.ZodString;
          }, z.core.$strict>, z.ZodObject<{
            source: z.ZodLiteral<"file">;
            provider: z.ZodString;
            id: z.ZodString;
          }, z.core.$strict>, z.ZodObject<{
            source: z.ZodLiteral<"exec">;
            provider: z.ZodString;
            id: z.ZodString;
          }, z.core.$strict>, z.ZodObject<{
            source: z.ZodLiteral<"store">;
            provider: z.ZodString;
            id: z.ZodString;
          }, z.core.$strict>], "source">]>>;
          key: z.ZodOptional<z.ZodUnion<readonly [z.ZodString, z.ZodDiscriminatedUnion<[z.ZodObject<{
            source: z.ZodLiteral<"env">;
            provider: z.ZodString;
            id: z.ZodString;
          }, z.core.$strict>, z.ZodObject<{
            source: z.ZodLiteral<"file">;
            provider: z.ZodString;
            id: z.ZodString;
          }, z.core.$strict>, z.ZodObject<{
            source: z.ZodLiteral<"exec">;
            provider: z.ZodString;
            id: z.ZodString;
          }, z.core.$strict>, z.ZodObject<{
            source: z.ZodLiteral<"store">;
            provider: z.ZodString;
            id: z.ZodString;
          }, z.core.$strict>], "source">]>>;
          passphrase: z.ZodOptional<z.ZodUnion<readonly [z.ZodString, z.ZodDiscriminatedUnion<[z.ZodObject<{
            source: z.ZodLiteral<"env">;
            provider: z.ZodString;
            id: z.ZodString;
          }, z.core.$strict>, z.ZodObject<{
            source: z.ZodLiteral<"file">;
            provider: z.ZodString;
            id: z.ZodString;
          }, z.core.$strict>, z.ZodObject<{
            source: z.ZodLiteral<"exec">;
            provider: z.ZodString;
            id: z.ZodString;
          }, z.core.$strict>, z.ZodObject<{
            source: z.ZodLiteral<"store">;
            provider: z.ZodString;
            id: z.ZodString;
          }, z.core.$strict>], "source">]>>;
          serverName: z.ZodOptional<z.ZodString>;
          insecureSkipVerify: z.ZodOptional<z.ZodBoolean>;
        }, z.core.$strict>>;
      }, z.core.$strict>>;
      enabled: z.ZodOptional<z.ZodBoolean>;
      preferredModel: z.ZodOptional<z.ZodString>;
      scope: z.ZodOptional<z.ZodObject<{
        default: z.ZodOptional<z.ZodUnion<readonly [z.ZodLiteral<"allow">, z.ZodLiteral<"deny">]>>;
        rules: z.ZodOptional<z.ZodArray<z.ZodObject<{
          action: z.ZodUnion<readonly [z.ZodLiteral<"allow">, z.ZodLiteral<"deny">]>;
          match: z.ZodOptional<z.ZodObject<{
            channel: z.ZodOptional<z.ZodString>;
            chatType: z.ZodOptional<z.ZodUnion<readonly [z.ZodLiteral<"direct">, z.ZodLiteral<"group">, z.ZodLiteral<"channel">]>>;
            keyPrefix: z.ZodOptional<z.ZodString>;
            rawKeyPrefix: z.ZodOptional<z.ZodString>;
          }, z.core.$strict>>;
        }, z.core.$strict>>>;
      }, z.core.$strict>>;
      maxBytes: z.ZodOptional<z.ZodNumber>;
      maxChars: z.ZodOptional<z.ZodNumber>;
      attachments: z.ZodOptional<z.ZodObject<{
        mode: z.ZodOptional<z.ZodUnion<readonly [z.ZodLiteral<"first">, z.ZodLiteral<"all">]>>;
        maxAttachments: z.ZodOptional<z.ZodNumber>;
        prefer: z.ZodOptional<z.ZodUnion<readonly [z.ZodLiteral<"first">, z.ZodLiteral<"last">, z.ZodLiteral<"path">, z.ZodLiteral<"url">]>>;
      }, z.core.$strict>>;
      echoTranscript: z.ZodOptional<z.ZodBoolean>;
      echoFormat: z.ZodOptional<z.ZodString>;
    }, z.core.$strict>>>;
    video: z.ZodOptional<z.ZodOptional<z.ZodObject<{
      prompt: z.ZodOptional<z.ZodString>;
      timeoutSeconds: z.ZodOptional<z.ZodNumber>;
      language: z.ZodOptional<z.ZodString>;
      providerOptions: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodRecord<z.ZodString, z.ZodUnion<readonly [z.ZodString, z.ZodNumber, z.ZodBoolean]>>>>;
      baseUrl: z.ZodOptional<z.ZodString>;
      headers: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
      request: z.ZodOptional<z.ZodObject<{
        headers: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnion<readonly [z.ZodString, z.ZodDiscriminatedUnion<[z.ZodObject<{
          source: z.ZodLiteral<"env">;
          provider: z.ZodString;
          id: z.ZodString;
        }, z.core.$strict>, z.ZodObject<{
          source: z.ZodLiteral<"file">;
          provider: z.ZodString;
          id: z.ZodString;
        }, z.core.$strict>, z.ZodObject<{
          source: z.ZodLiteral<"exec">;
          provider: z.ZodString;
          id: z.ZodString;
        }, z.core.$strict>, z.ZodObject<{
          source: z.ZodLiteral<"store">;
          provider: z.ZodString;
          id: z.ZodString;
        }, z.core.$strict>], "source">]>>>;
        auth: z.ZodOptional<z.ZodUnion<readonly [z.ZodObject<{
          mode: z.ZodLiteral<"provider-default">;
        }, z.core.$strict>, z.ZodObject<{
          mode: z.ZodLiteral<"authorization-bearer">;
          token: z.ZodUnion<readonly [z.ZodString, z.ZodDiscriminatedUnion<[z.ZodObject<{
            source: z.ZodLiteral<"env">;
            provider: z.ZodString;
            id: z.ZodString;
          }, z.core.$strict>, z.ZodObject<{
            source: z.ZodLiteral<"file">;
            provider: z.ZodString;
            id: z.ZodString;
          }, z.core.$strict>, z.ZodObject<{
            source: z.ZodLiteral<"exec">;
            provider: z.ZodString;
            id: z.ZodString;
          }, z.core.$strict>, z.ZodObject<{
            source: z.ZodLiteral<"store">;
            provider: z.ZodString;
            id: z.ZodString;
          }, z.core.$strict>], "source">]>;
        }, z.core.$strict>, z.ZodObject<{
          mode: z.ZodLiteral<"header">;
          headerName: z.ZodString;
          value: z.ZodUnion<readonly [z.ZodString, z.ZodDiscriminatedUnion<[z.ZodObject<{
            source: z.ZodLiteral<"env">;
            provider: z.ZodString;
            id: z.ZodString;
          }, z.core.$strict>, z.ZodObject<{
            source: z.ZodLiteral<"file">;
            provider: z.ZodString;
            id: z.ZodString;
          }, z.core.$strict>, z.ZodObject<{
            source: z.ZodLiteral<"exec">;
            provider: z.ZodString;
            id: z.ZodString;
          }, z.core.$strict>, z.ZodObject<{
            source: z.ZodLiteral<"store">;
            provider: z.ZodString;
            id: z.ZodString;
          }, z.core.$strict>], "source">]>;
          prefix: z.ZodOptional<z.ZodString>;
        }, z.core.$strict>]>>;
        proxy: z.ZodOptional<z.ZodUnion<readonly [z.ZodObject<{
          mode: z.ZodLiteral<"env-proxy">;
          tls: z.ZodOptional<z.ZodObject<{
            ca: z.ZodOptional<z.ZodUnion<readonly [z.ZodString, z.ZodDiscriminatedUnion<[z.ZodObject<{
              source: z.ZodLiteral<"env">;
              provider: z.ZodString;
              id: z.ZodString;
            }, z.core.$strict>, z.ZodObject<{
              source: z.ZodLiteral<"file">;
              provider: z.ZodString;
              id: z.ZodString;
            }, z.core.$strict>, z.ZodObject<{
              source: z.ZodLiteral<"exec">;
              provider: z.ZodString;
              id: z.ZodString;
            }, z.core.$strict>, z.ZodObject<{
              source: z.ZodLiteral<"store">;
              provider: z.ZodString;
              id: z.ZodString;
            }, z.core.$strict>], "source">]>>;
            cert: z.ZodOptional<z.ZodUnion<readonly [z.ZodString, z.ZodDiscriminatedUnion<[z.ZodObject<{
              source: z.ZodLiteral<"env">;
              provider: z.ZodString;
              id: z.ZodString;
            }, z.core.$strict>, z.ZodObject<{
              source: z.ZodLiteral<"file">;
              provider: z.ZodString;
              id: z.ZodString;
            }, z.core.$strict>, z.ZodObject<{
              source: z.ZodLiteral<"exec">;
              provider: z.ZodString;
              id: z.ZodString;
            }, z.core.$strict>, z.ZodObject<{
              source: z.ZodLiteral<"store">;
              provider: z.ZodString;
              id: z.ZodString;
            }, z.core.$strict>], "source">]>>;
            key: z.ZodOptional<z.ZodUnion<readonly [z.ZodString, z.ZodDiscriminatedUnion<[z.ZodObject<{
              source: z.ZodLiteral<"env">;
              provider: z.ZodString;
              id: z.ZodString;
            }, z.core.$strict>, z.ZodObject<{
              source: z.ZodLiteral<"file">;
              provider: z.ZodString;
              id: z.ZodString;
            }, z.core.$strict>, z.ZodObject<{
              source: z.ZodLiteral<"exec">;
              provider: z.ZodString;
              id: z.ZodString;
            }, z.core.$strict>, z.ZodObject<{
              source: z.ZodLiteral<"store">;
              provider: z.ZodString;
              id: z.ZodString;
            }, z.core.$strict>], "source">]>>;
            passphrase: z.ZodOptional<z.ZodUnion<readonly [z.ZodString, z.ZodDiscriminatedUnion<[z.ZodObject<{
              source: z.ZodLiteral<"env">;
              provider: z.ZodString;
              id: z.ZodString;
            }, z.core.$strict>, z.ZodObject<{
              source: z.ZodLiteral<"file">;
              provider: z.ZodString;
              id: z.ZodString;
            }, z.core.$strict>, z.ZodObject<{
              source: z.ZodLiteral<"exec">;
              provider: z.ZodString;
              id: z.ZodString;
            }, z.core.$strict>, z.ZodObject<{
              source: z.ZodLiteral<"store">;
              provider: z.ZodString;
              id: z.ZodString;
            }, z.core.$strict>], "source">]>>;
            serverName: z.ZodOptional<z.ZodString>;
            insecureSkipVerify: z.ZodOptional<z.ZodBoolean>;
          }, z.core.$strict>>;
        }, z.core.$strict>, z.ZodObject<{
          mode: z.ZodLiteral<"explicit-proxy">;
          url: z.ZodString;
          tls: z.ZodOptional<z.ZodObject<{
            ca: z.ZodOptional<z.ZodUnion<readonly [z.ZodString, z.ZodDiscriminatedUnion<[z.ZodObject<{
              source: z.ZodLiteral<"env">;
              provider: z.ZodString;
              id: z.ZodString;
            }, z.core.$strict>, z.ZodObject<{
              source: z.ZodLiteral<"file">;
              provider: z.ZodString;
              id: z.ZodString;
            }, z.core.$strict>, z.ZodObject<{
              source: z.ZodLiteral<"exec">;
              provider: z.ZodString;
              id: z.ZodString;
            }, z.core.$strict>, z.ZodObject<{
              source: z.ZodLiteral<"store">;
              provider: z.ZodString;
              id: z.ZodString;
            }, z.core.$strict>], "source">]>>;
            cert: z.ZodOptional<z.ZodUnion<readonly [z.ZodString, z.ZodDiscriminatedUnion<[z.ZodObject<{
              source: z.ZodLiteral<"env">;
              provider: z.ZodString;
              id: z.ZodString;
            }, z.core.$strict>, z.ZodObject<{
              source: z.ZodLiteral<"file">;
              provider: z.ZodString;
              id: z.ZodString;
            }, z.core.$strict>, z.ZodObject<{
              source: z.ZodLiteral<"exec">;
              provider: z.ZodString;
              id: z.ZodString;
            }, z.core.$strict>, z.ZodObject<{
              source: z.ZodLiteral<"store">;
              provider: z.ZodString;
              id: z.ZodString;
            }, z.core.$strict>], "source">]>>;
            key: z.ZodOptional<z.ZodUnion<readonly [z.ZodString, z.ZodDiscriminatedUnion<[z.ZodObject<{
              source: z.ZodLiteral<"env">;
              provider: z.ZodString;
              id: z.ZodString;
            }, z.core.$strict>, z.ZodObject<{
              source: z.ZodLiteral<"file">;
              provider: z.ZodString;
              id: z.ZodString;
            }, z.core.$strict>, z.ZodObject<{
              source: z.ZodLiteral<"exec">;
              provider: z.ZodString;
              id: z.ZodString;
            }, z.core.$strict>, z.ZodObject<{
              source: z.ZodLiteral<"store">;
              provider: z.ZodString;
              id: z.ZodString;
            }, z.core.$strict>], "source">]>>;
            passphrase: z.ZodOptional<z.ZodUnion<readonly [z.ZodString, z.ZodDiscriminatedUnion<[z.ZodObject<{
              source: z.ZodLiteral<"env">;
              provider: z.ZodString;
              id: z.ZodString;
            }, z.core.$strict>, z.ZodObject<{
              source: z.ZodLiteral<"file">;
              provider: z.ZodString;
              id: z.ZodString;
            }, z.core.$strict>, z.ZodObject<{
              source: z.ZodLiteral<"exec">;
              provider: z.ZodString;
              id: z.ZodString;
            }, z.core.$strict>, z.ZodObject<{
              source: z.ZodLiteral<"store">;
              provider: z.ZodString;
              id: z.ZodString;
            }, z.core.$strict>], "source">]>>;
            serverName: z.ZodOptional<z.ZodString>;
            insecureSkipVerify: z.ZodOptional<z.ZodBoolean>;
          }, z.core.$strict>>;
        }, z.core.$strict>]>>;
        tls: z.ZodOptional<z.ZodObject<{
          ca: z.ZodOptional<z.ZodUnion<readonly [z.ZodString, z.ZodDiscriminatedUnion<[z.ZodObject<{
            source: z.ZodLiteral<"env">;
            provider: z.ZodString;
            id: z.ZodString;
          }, z.core.$strict>, z.ZodObject<{
            source: z.ZodLiteral<"file">;
            provider: z.ZodString;
            id: z.ZodString;
          }, z.core.$strict>, z.ZodObject<{
            source: z.ZodLiteral<"exec">;
            provider: z.ZodString;
            id: z.ZodString;
          }, z.core.$strict>, z.ZodObject<{
            source: z.ZodLiteral<"store">;
            provider: z.ZodString;
            id: z.ZodString;
          }, z.core.$strict>], "source">]>>;
          cert: z.ZodOptional<z.ZodUnion<readonly [z.ZodString, z.ZodDiscriminatedUnion<[z.ZodObject<{
            source: z.ZodLiteral<"env">;
            provider: z.ZodString;
            id: z.ZodString;
          }, z.core.$strict>, z.ZodObject<{
            source: z.ZodLiteral<"file">;
            provider: z.ZodString;
            id: z.ZodString;
          }, z.core.$strict>, z.ZodObject<{
            source: z.ZodLiteral<"exec">;
            provider: z.ZodString;
            id: z.ZodString;
          }, z.core.$strict>, z.ZodObject<{
            source: z.ZodLiteral<"store">;
            provider: z.ZodString;
            id: z.ZodString;
          }, z.core.$strict>], "source">]>>;
          key: z.ZodOptional<z.ZodUnion<readonly [z.ZodString, z.ZodDiscriminatedUnion<[z.ZodObject<{
            source: z.ZodLiteral<"env">;
            provider: z.ZodString;
            id: z.ZodString;
          }, z.core.$strict>, z.ZodObject<{
            source: z.ZodLiteral<"file">;
            provider: z.ZodString;
            id: z.ZodString;
          }, z.core.$strict>, z.ZodObject<{
            source: z.ZodLiteral<"exec">;
            provider: z.ZodString;
            id: z.ZodString;
          }, z.core.$strict>, z.ZodObject<{
            source: z.ZodLiteral<"store">;
            provider: z.ZodString;
            id: z.ZodString;
          }, z.core.$strict>], "source">]>>;
          passphrase: z.ZodOptional<z.ZodUnion<readonly [z.ZodString, z.ZodDiscriminatedUnion<[z.ZodObject<{
            source: z.ZodLiteral<"env">;
            provider: z.ZodString;
            id: z.ZodString;
          }, z.core.$strict>, z.ZodObject<{
            source: z.ZodLiteral<"file">;
            provider: z.ZodString;
            id: z.ZodString;
          }, z.core.$strict>, z.ZodObject<{
            source: z.ZodLiteral<"exec">;
            provider: z.ZodString;
            id: z.ZodString;
          }, z.core.$strict>, z.ZodObject<{
            source: z.ZodLiteral<"store">;
            provider: z.ZodString;
            id: z.ZodString;
          }, z.core.$strict>], "source">]>>;
          serverName: z.ZodOptional<z.ZodString>;
          insecureSkipVerify: z.ZodOptional<z.ZodBoolean>;
        }, z.core.$strict>>;
      }, z.core.$strict>>;
      enabled: z.ZodOptional<z.ZodBoolean>;
      preferredModel: z.ZodOptional<z.ZodString>;
      scope: z.ZodOptional<z.ZodObject<{
        default: z.ZodOptional<z.ZodUnion<readonly [z.ZodLiteral<"allow">, z.ZodLiteral<"deny">]>>;
        rules: z.ZodOptional<z.ZodArray<z.ZodObject<{
          action: z.ZodUnion<readonly [z.ZodLiteral<"allow">, z.ZodLiteral<"deny">]>;
          match: z.ZodOptional<z.ZodObject<{
            channel: z.ZodOptional<z.ZodString>;
            chatType: z.ZodOptional<z.ZodUnion<readonly [z.ZodLiteral<"direct">, z.ZodLiteral<"group">, z.ZodLiteral<"channel">]>>;
            keyPrefix: z.ZodOptional<z.ZodString>;
            rawKeyPrefix: z.ZodOptional<z.ZodString>;
          }, z.core.$strict>>;
        }, z.core.$strict>>>;
      }, z.core.$strict>>;
      maxBytes: z.ZodOptional<z.ZodNumber>;
      maxChars: z.ZodOptional<z.ZodNumber>;
      attachments: z.ZodOptional<z.ZodObject<{
        mode: z.ZodOptional<z.ZodUnion<readonly [z.ZodLiteral<"first">, z.ZodLiteral<"all">]>>;
        maxAttachments: z.ZodOptional<z.ZodNumber>;
        prefer: z.ZodOptional<z.ZodUnion<readonly [z.ZodLiteral<"first">, z.ZodLiteral<"last">, z.ZodLiteral<"path">, z.ZodLiteral<"url">]>>;
      }, z.core.$strict>>;
    }, z.core.$strict>>>;
  }, z.core.$strict>>;
  links: z.ZodOptional<z.ZodObject<{
    enabled: z.ZodOptional<z.ZodBoolean>;
    scope: z.ZodOptional<z.ZodObject<{
      default: z.ZodOptional<z.ZodUnion<readonly [z.ZodLiteral<"allow">, z.ZodLiteral<"deny">]>>;
      rules: z.ZodOptional<z.ZodArray<z.ZodObject<{
        action: z.ZodUnion<readonly [z.ZodLiteral<"allow">, z.ZodLiteral<"deny">]>;
        match: z.ZodOptional<z.ZodObject<{
          channel: z.ZodOptional<z.ZodString>;
          chatType: z.ZodOptional<z.ZodUnion<readonly [z.ZodLiteral<"direct">, z.ZodLiteral<"group">, z.ZodLiteral<"channel">]>>;
          keyPrefix: z.ZodOptional<z.ZodString>;
          rawKeyPrefix: z.ZodOptional<z.ZodString>;
        }, z.core.$strict>>;
      }, z.core.$strict>>>;
    }, z.core.$strict>>;
    maxLinks: z.ZodOptional<z.ZodNumber>;
    timeoutSeconds: z.ZodOptional<z.ZodNumber>;
    models: z.ZodOptional<z.ZodArray<z.ZodObject<{
      type: z.ZodOptional<z.ZodLiteral<"cli">>;
      command: z.ZodString;
      args: z.ZodOptional<z.ZodArray<z.ZodString>>;
      timeoutSeconds: z.ZodOptional<z.ZodNumber>;
    }, z.core.$strict>>>;
  }, z.core.$strict>>;
  sessions: z.ZodOptional<z.ZodObject<{
    visibility: z.ZodOptional<z.ZodEnum<{
      agent: "agent";
      all: "all";
      self: "self";
      tree: "tree";
    }>>;
  }, z.core.$strict>>;
  loopDetection: z.ZodOptional<z.ZodObject<{
    enabled: z.ZodOptional<z.ZodBoolean>;
  }, z.core.$strict>>;
  toolSearch: z.ZodOptional<z.ZodUnion<readonly [z.ZodBoolean, z.ZodObject<{
    enabled: z.ZodOptional<z.ZodBoolean>;
    mode: z.ZodOptional<z.ZodEnum<{
      code: "code";
      directory: "directory";
      tools: "tools";
    }>>;
    codeTimeoutMs: z.ZodOptional<z.ZodNumber>;
    searchDefaultLimit: z.ZodOptional<z.ZodNumber>;
    maxSearchLimit: z.ZodOptional<z.ZodNumber>;
  }, z.core.$strict>]>>;
  codeMode: z.ZodOptional<z.ZodUnion<readonly [z.ZodBoolean, z.ZodLiteral<"auto">, z.ZodObject<{
    enabled: z.ZodOptional<z.ZodUnion<readonly [z.ZodBoolean, z.ZodLiteral<"auto">]>>;
    runtime: z.ZodOptional<z.ZodLiteral<"quickjs-wasi">>;
    mode: z.ZodOptional<z.ZodLiteral<"only">>;
    languages: z.ZodOptional<z.ZodArray<z.ZodEnum<{
      javascript: "javascript";
      typescript: "typescript";
    }>>>;
    timeoutMs: z.ZodOptional<z.ZodNumber>;
    memoryLimitBytes: z.ZodOptional<z.ZodNumber>;
    maxOutputBytes: z.ZodOptional<z.ZodNumber>;
    maxSnapshotBytes: z.ZodOptional<z.ZodNumber>;
    maxPendingToolCalls: z.ZodOptional<z.ZodNumber>;
    snapshotTtlSeconds: z.ZodOptional<z.ZodNumber>;
    searchDefaultLimit: z.ZodOptional<z.ZodNumber>;
    maxSearchLimit: z.ZodOptional<z.ZodNumber>;
  }, z.core.$strict>]>>;
  swarm: z.ZodOptional<z.ZodUnion<readonly [z.ZodBoolean, z.ZodObject<{
    enabled: z.ZodOptional<z.ZodBoolean>;
    maxConcurrent: z.ZodOptional<z.ZodNumber>;
    maxChildrenPerGroup: z.ZodOptional<z.ZodNumber>;
    maxTotalPerGroup: z.ZodOptional<z.ZodNumber>;
    waitTimeoutSecondsMax: z.ZodOptional<z.ZodNumber>;
    defaultAgentId: z.ZodOptional<z.ZodString>;
  }, z.core.$strict>]>>;
  message: z.ZodOptional<z.ZodObject<{
    crossContext: z.ZodOptional<z.ZodObject<{
      allowWithinProvider: z.ZodOptional<z.ZodBoolean>;
      allowAcrossProviders: z.ZodOptional<z.ZodBoolean>;
      marker: z.ZodOptional<z.ZodObject<{
        enabled: z.ZodOptional<z.ZodBoolean>;
        prefix: z.ZodOptional<z.ZodString>;
        suffix: z.ZodOptional<z.ZodString>;
      }, z.core.$strict>>;
    }, z.core.$strict>>;
    actions: z.ZodOptional<z.ZodObject<{
      allow: z.ZodOptional<z.ZodArray<z.ZodString>>;
    }, z.core.$strict>>;
    broadcast: z.ZodOptional<z.ZodObject<{
      enabled: z.ZodOptional<z.ZodBoolean>;
    }, z.core.$strict>>;
  }, z.core.$strict>>;
  agentToAgent: z.ZodOptional<z.ZodObject<{
    enabled: z.ZodOptional<z.ZodBoolean>;
    allow: z.ZodOptional<z.ZodArray<z.ZodString>>;
  }, z.core.$strict>>;
  elevated: z.ZodOptional<z.ZodObject<{
    enabled: z.ZodOptional<z.ZodBoolean>;
    allowFrom: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodArray<z.ZodUnion<readonly [z.ZodString, z.ZodNumber]>>>>;
  }, z.core.$strict>>;
  exec: z.ZodOptional<z.ZodObject<{
    host: z.ZodOptional<z.ZodEnum<{
      auto: "auto";
      gateway: "gateway";
      node: "node";
      sandbox: "sandbox";
    }>>;
    mode: z.ZodOptional<z.ZodEnum<{
      allowlist: "allowlist";
      ask: "ask";
      auto: "auto";
      deny: "deny";
      full: "full";
    }>>;
    security: z.ZodOptional<z.ZodEnum<{
      allowlist: "allowlist";
      deny: "deny";
      full: "full";
    }>>;
    ask: z.ZodOptional<z.ZodEnum<{
      always: "always";
      off: "off";
      "on-miss": "on-miss";
    }>>;
    node: z.ZodOptional<z.ZodString>;
    pathPrepend: z.ZodOptional<z.ZodArray<z.ZodString>>;
    safeBins: z.ZodOptional<z.ZodArray<z.ZodString>>;
    strictInlineEval: z.ZodOptional<z.ZodBoolean>;
    commandHighlighting: z.ZodOptional<z.ZodBoolean>;
    grantExpiryDays: z.ZodOptional<z.ZodNumber>;
    safeBinTrustedDirs: z.ZodOptional<z.ZodArray<z.ZodString>>;
    safeBinProfiles: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodObject<{
      minPositional: z.ZodOptional<z.ZodNumber>;
      maxPositional: z.ZodOptional<z.ZodNumber>;
      allowedValueFlags: z.ZodOptional<z.ZodArray<z.ZodString>>;
      deniedFlags: z.ZodOptional<z.ZodArray<z.ZodString>>;
    }, z.core.$strict>>>;
    reviewer: z.ZodOptional<z.ZodObject<{
      model: z.ZodOptional<z.ZodUnion<readonly [z.ZodString, z.ZodObject<{
        primary: z.ZodOptional<z.ZodString>;
        fallbacks: z.ZodOptional<z.ZodArray<z.ZodString>>;
      }, z.core.$strict>]>>;
      thinking: z.ZodOptional<z.ZodEnum<{
        high: "high";
        low: "low";
        max: "max";
        medium: "medium";
        minimal: "minimal";
        xhigh: "xhigh";
      }>>;
      fastMode: z.ZodOptional<z.ZodBoolean>;
      timeoutMs: z.ZodOptional<z.ZodNumber>;
    }, z.core.$strict>>;
    backgroundMs: z.ZodOptional<z.ZodNumber>;
    approvalRunningNoticeMs: z.ZodOptional<z.ZodNumber>;
    timeoutSeconds: z.ZodOptional<z.ZodNumber>;
    cleanupMs: z.ZodOptional<z.ZodNumber>;
    notifyOnExit: z.ZodOptional<z.ZodBoolean>;
    notifyOnExitEmptySuccess: z.ZodOptional<z.ZodBoolean>;
    applyPatch: z.ZodOptional<z.ZodObject<{
      enabled: z.ZodOptional<z.ZodBoolean>;
      workspaceOnly: z.ZodOptional<z.ZodBoolean>;
      allowModels: z.ZodOptional<z.ZodArray<z.ZodString>>;
    }, z.core.$strict>>;
  }, z.core.$strict>>;
  fs: z.ZodOptional<z.ZodObject<{
    workspaceOnly: z.ZodOptional<z.ZodBoolean>;
  }, z.core.$strict>>;
  subagents: z.ZodOptional<z.ZodObject<{
    tools: z.ZodOptional<z.ZodObject<{
      allow: z.ZodOptional<z.ZodArray<z.ZodString>>;
      alsoAllow: z.ZodOptional<z.ZodArray<z.ZodString>>;
      deny: z.ZodOptional<z.ZodArray<z.ZodString>>;
    }, z.core.$strict>>;
  }, z.core.$strict>>;
  sandbox: z.ZodOptional<z.ZodObject<{
    tools: z.ZodOptional<z.ZodObject<{
      allow: z.ZodOptional<z.ZodArray<z.ZodString>>;
      alsoAllow: z.ZodOptional<z.ZodArray<z.ZodString>>;
      deny: z.ZodOptional<z.ZodArray<z.ZodString>>;
    }, z.core.$strict>>;
  }, z.core.$strict>>;
  sessions_spawn: z.ZodOptional<z.ZodObject<{
    attachments: z.ZodOptional<z.ZodObject<{
      enabled: z.ZodOptional<z.ZodBoolean>;
      maxTotalBytes: z.ZodOptional<z.ZodNumber>;
      maxFiles: z.ZodOptional<z.ZodNumber>;
      maxFileBytes: z.ZodOptional<z.ZodNumber>;
      retainOnSessionKeep: z.ZodOptional<z.ZodBoolean>;
    }, z.core.$strict>>;
  }, z.core.$strict>>;
  updatePlan: z.ZodOptional<z.ZodBoolean>;
}, z.core.$strict>>;
//#endregion
//#region src/config/zod-schema.memory-search.d.ts
declare const MemorySearchSchema: z.ZodOptional<z.ZodObject<{
  enabled: z.ZodOptional<z.ZodBoolean>;
  rememberAcrossConversations: z.ZodOptional<z.ZodBoolean>;
  sources: z.ZodOptional<z.ZodArray<z.ZodUnion<readonly [z.ZodLiteral<"memory">, z.ZodLiteral<"sessions">]>>>;
  extraPaths: z.ZodOptional<z.ZodArray<z.ZodUnion<readonly [z.ZodString, z.ZodObject<{
    path: z.ZodString;
    pattern: z.ZodOptional<z.ZodString>;
  }, z.core.$strict>]>>>;
  multimodal: z.ZodOptional<z.ZodObject<{
    enabled: z.ZodOptional<z.ZodBoolean>;
    modalities: z.ZodOptional<z.ZodArray<z.ZodUnion<readonly [z.ZodLiteral<"image">, z.ZodLiteral<"audio">, z.ZodLiteral<"all">]>>>;
    maxFileBytes: z.ZodOptional<z.ZodNumber>;
  }, z.core.$strict>>;
  experimental: z.ZodOptional<z.ZodObject<{
    sessionMemory: z.ZodOptional<z.ZodBoolean>;
  }, z.core.$strict>>;
  provider: z.ZodOptional<z.ZodString>;
  remote: z.ZodOptional<z.ZodObject<{
    baseUrl: z.ZodOptional<z.ZodString>;
    apiKey: z.ZodOptional<z.ZodUnion<readonly [z.ZodString, z.ZodDiscriminatedUnion<[z.ZodObject<{
      source: z.ZodLiteral<"env">;
      provider: z.ZodString;
      id: z.ZodString;
    }, z.core.$strict>, z.ZodObject<{
      source: z.ZodLiteral<"file">;
      provider: z.ZodString;
      id: z.ZodString;
    }, z.core.$strict>, z.ZodObject<{
      source: z.ZodLiteral<"exec">;
      provider: z.ZodString;
      id: z.ZodString;
    }, z.core.$strict>, z.ZodObject<{
      source: z.ZodLiteral<"store">;
      provider: z.ZodString;
      id: z.ZodString;
    }, z.core.$strict>], "source">]>>;
    headers: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
    batch: z.ZodOptional<z.ZodObject<{
      enabled: z.ZodOptional<z.ZodBoolean>;
    }, z.core.$strict>>;
  }, z.core.$strict>>;
  fallback: z.ZodOptional<z.ZodString>;
  model: z.ZodOptional<z.ZodString>;
  inputType: z.ZodOptional<z.ZodString>;
  queryInputType: z.ZodOptional<z.ZodString>;
  documentInputType: z.ZodOptional<z.ZodString>;
  outputDimensionality: z.ZodOptional<z.ZodNumber>;
  local: z.ZodOptional<z.ZodObject<{
    modelPath: z.ZodOptional<z.ZodString>;
  }, z.core.$strict>>;
  store: z.ZodOptional<z.ZodObject<{
    fts: z.ZodOptional<z.ZodObject<{
      tokenizer: z.ZodOptional<z.ZodUnion<readonly [z.ZodLiteral<"unicode61">, z.ZodLiteral<"trigram">]>>;
    }, z.core.$strict>>;
    vector: z.ZodOptional<z.ZodObject<{
      enabled: z.ZodOptional<z.ZodBoolean>;
      extensionPath: z.ZodOptional<z.ZodString>;
    }, z.core.$strict>>;
  }, z.core.$strict>>;
  query: z.ZodOptional<z.ZodObject<{
    maxResults: z.ZodOptional<z.ZodNumber>;
    minScore: z.ZodOptional<z.ZodNumber>;
  }, z.core.$strict>>;
  cache: z.ZodOptional<z.ZodObject<{
    enabled: z.ZodOptional<z.ZodBoolean>;
  }, z.core.$strict>>;
}, z.core.$strict>>;
type MemorySearchConfigInput = NonNullable<z.input<typeof MemorySearchSchema>>;
//#endregion
//#region src/config/types.memory.d.ts
/** Citation rendering mode for memory-injected context. */
type MemoryCitationsMode = "auto" | "on" | "off";
/** Top-level memory config block. */
type MemoryConfig = {
  citations?: MemoryCitationsMode;
  /** Shared embedding/search defaults. Per-agent overrides live under agents.entries.*.memory.search. */
  search?: MemorySearchConfig;
};
type MemorySearchConfig = Omit<MemorySearchConfigInput, "store"> & {
  /** Preserve legacy embedding-cache authoring accepted by Doctor migrations. */
  store?: NonNullable<MemorySearchConfigInput["store"]> & {
    cache?: {
      enabled?: boolean;
      maxEntries?: number;
    };
  };
};
//#endregion
//#region src/config/types.messages.d.ts
type DefinedSchemaInput<T extends z.ZodType> = NonNullable<z.input<T>>;
type MentionPatternsPolicyConfig = DefinedSchemaInput<typeof MentionPatternsPolicySchema>;
type MentionPatternsMode = NonNullable<MentionPatternsPolicyConfig["mode"]>;
type GroupChatSchemaInput = DefinedSchemaInput<typeof GroupChatSchema>;
type GroupChatConfig = Omit<GroupChatSchemaInput, "visibleReplies"> & {
  visibleReplies?: "automatic" | "message_tool";
};
type DmConfig = DefinedSchemaInput<typeof DmConfigSchema>;
type BroadcastGroupConfig = Exclude<DefinedSchemaInput<typeof BroadcastSchema>[string], string[]>;
type BroadcastEntry = string[] | BroadcastGroupConfig;
type BroadcastStrategy = NonNullable<DefinedSchemaInput<typeof BroadcastSchema>["strategy"]>;
type BroadcastConfig = {
  strategy?: BroadcastStrategy;
  /**
   * Map channel-qualified peer IDs to participant arrays or bounded group options.
   * Unqualified WhatsApp peer arrays retain single-pass behavior.
   *
   * Note: the index signature includes `undefined` so `strategy?: ...` remains type-safe.
   */
  [peerId: string]: BroadcastEntry | BroadcastStrategy | undefined;
};
type MessagesSchemaInput = DefinedSchemaInput<typeof MessagesSchema>;
type MessagesConfig = Omit<MessagesSchemaInput, "groupChat" | "visibleReplies"> & {
  /** @deprecated Doctor-only legacy input. */
  removeAckAfterReply?: boolean;
  visibleReplies?: "automatic" | "message_tool";
  groupChat?: GroupChatConfig;
};
type NativeCommandsSetting = boolean | "auto";
type CommandAllowFrom = Record<string, Array<string | number>>;
type CommandsConfig = {
  /** @deprecated Doctor-only legacy input. */
  ownerDisplay?: "raw" | "hash";
  /** @deprecated Doctor-only legacy input. */
  ownerDisplaySecret?: string;
  native?: NativeCommandsSetting;
  nativeSkills?: NativeCommandsSetting;
  text?: boolean;
  bash?: boolean;
  bashForegroundMs?: number;
  config?: boolean;
  mcp?: boolean;
  plugins?: boolean;
  debug?: boolean;
  restart?: boolean;
  ownerAllowFrom?: Array<string | number>;
  allowFrom?: CommandAllowFrom;
};
type ProviderCommandsConfig = DefinedSchemaInput<typeof ProviderCommandsSchema>;
//#endregion
//#region src/config/types.bot-loop-protection.d.ts
type ChannelBotLoopProtectionConfig = {
  /** Enable pair loop protection for channels that support it. */
  enabled?: boolean;
  /** Maximum events a sender/receiver pair may exchange within the window. */
  maxEventsPerWindow?: number;
  /** Sliding window length in seconds. */
  windowSeconds?: number;
  /** Cooldown seconds applied to a pair after the limit is hit. */
  cooldownSeconds?: number;
};
//#endregion
//#region src/config/types.channel-health.d.ts
type ChannelHeartbeatVisibilityConfig = {
  /** Show HEARTBEAT_OK acknowledgments in chat (default: false). */
  showOk?: boolean;
  /** Show heartbeat alerts with actual content (default: true). */
  showAlerts?: boolean;
  /** Emit indicator events for UI status display (default: true). */
  useIndicator?: boolean;
};
type ChannelHealthMonitorConfig = {
  /**
   * Enable channel-health-monitor restarts for this channel or account.
   * Inherits the global gateway setting when omitted.
   */
  enabled?: boolean;
};
//#endregion
//#region src/config/types.approvals.d.ts
type NativeExecApprovalEnableMode = boolean | "auto";
type ExecApprovalForwardingMode = "session" | "targets" | "both";
type ExecApprovalForwardTarget = {
  /** Channel id (e.g. "discord", "slack", or plugin channel id). */
  channel: string;
  /** Destination id (channel id, user id, etc. depending on channel). */
  to: string;
  /** Optional account id for multi-account channels. */
  accountId?: string;
  /** Optional thread id to reply inside a thread. */
  threadId?: string | number;
};
type ExecApprovalForwardingConfig = {
  /** Enable forwarding exec approvals to chat channels. Default: false. */
  enabled?: boolean;
  /** Delivery mode (session=origin chat, targets=config targets, both=both). Default: session. */
  mode?: ExecApprovalForwardingMode;
  /** Only forward approvals for these agent IDs. Omit = all agents. */
  agentFilter?: string[];
  /** Only forward approvals matching these session key patterns (substring or regex). */
  sessionFilter?: string[];
  /** Explicit delivery targets (used when mode includes targets). */
  targets?: ExecApprovalForwardTarget[];
};
type ApprovalsConfig = {
  exec?: ExecApprovalForwardingConfig;
  plugin?: ExecApprovalForwardingConfig;
};
//#endregion
//#region src/config/types.channel-messaging-common.d.ts
type CommonChannelMessagingConfig<TCapabilities = string[], TAllowFromEntry = string | number, TDefaultTo = string, TStreaming = ChannelDeliveryStreamingConfig> = {
  /** Optional display name for this account (used in CLI/UI lists). */
  name?: string;
  /** Optional provider capability tags used for agent/runtime guidance. */
  capabilities?: TCapabilities;
  /** Markdown formatting overrides (tables). */
  markdown?: MarkdownConfig;
  /** Allow channel-initiated config writes (default: true). */
  configWrites?: boolean;
  /** If false, do not start this account. Default: true. */
  enabled?: boolean;
  /** Direct message access policy (default: pairing). */
  dmPolicy?: DmPolicy;
  /** Optional allowlist for inbound DM senders. */
  allowFrom?: TAllowFromEntry[];
  /** Default delivery target for CLI --deliver when no explicit --reply-to is provided. */
  defaultTo?: TDefaultTo;
  /** Optional allowlist for group/channel senders. */
  groupAllowFrom?: TAllowFromEntry[];
  /** Group/channel message handling policy. */
  groupPolicy?: GroupPolicy;
  /** Scope configured mention patterns to selected conversations. */
  mentionPatterns?: MentionPatternsPolicyConfig;
  /**
   * Supplemental context visibility policy for fetched/group context.
   * - "all": include all quoted/thread/history context
   * - "allowlist": only include context from allowlisted senders
   * - "allowlist_quote": same as allowlist, but keep explicit quote/reply context
   */
  contextVisibility?: ContextVisibilityMode;
  /** Max group/channel messages to keep as history context (0 disables). */
  historyLimit?: number;
  /** Max DM turns to keep as history context. */
  dmHistoryLimit?: number;
  /** Per-DM config overrides keyed by sender ID. */
  dms?: Record<string, DmConfig>;
  /** Outbound text chunk size (chars). */
  textChunkLimit?: number;
  /** Delivery streaming config: chunk mode plus block streaming controls. */
  streaming?: TStreaming;
  /** Heartbeat visibility settings for this channel. */
  heartbeatVisibility?: ChannelHeartbeatVisibilityConfig;
  /** @deprecated Doctor-only legacy input. */
  heartbeat?: ChannelHeartbeatVisibilityConfig;
  /** Channel health monitor overrides for this channel/account. */
  healthMonitor?: ChannelHealthMonitorConfig;
  /** Outbound response prefix override for this channel/account. */
  responsePrefix?: string;
  /** Max outbound media size in MB. */
  mediaMaxMb?: number;
  /** Native reply-threading mode for automatic replies. */
  replyToMode?: ReplyToMode;
};
type ChannelExecApprovalTarget = "dm" | "channel" | "both";
type ChannelExecApprovalConfig<TApprover = string | number> = {
  enabled?: NativeExecApprovalEnableMode;
  approvers?: TApprover[];
  agentFilter?: string[];
  sessionFilter?: string[];
  target?: ChannelExecApprovalTarget;
};
type ChannelBotInteractionConfig<TAllowBots = boolean | "mentions"> = {
  allowBots?: TAllowBots;
  botLoopProtection?: ChannelBotLoopProtectionConfig;
  dangerouslyAllowNameMatching?: boolean;
};
type ChannelReadReceiptConfig = {
  sendReadReceipts?: boolean;
};
type ChannelReactionConfig<TNotification = never, TLevel = never, TAckReaction = never, TAllowlist extends boolean = false> = {
  reactionNotifications?: TNotification;
  reactionLevel?: TLevel;
  ackReaction?: TAckReaction;
} & (TAllowlist extends true ? {
  reactionAllowlist?: Array<string | number>;
} : Record<never, never>);
//#endregion
//#region src/config/types.discord-presence.d.ts
type DiscordPresenceEventsConfig = {
  /** Enable online-presence system events for this guild. Default: true when configured. */
  enabled?: boolean;
  /** Discord channel ID that receives the routed agent wake. */
  channelId: string;
  /** Optional immutable Discord user ID allowlist. Omit to include all human members. */
  users?: string[];
  /**
   * Suppress presence-derived online events for this many seconds after a new Gateway
   * session while guild presence state is rebuilt. 0 disables. Default: 300.
   */
  reconnectSuppressSeconds?: number;
  /** Maximum queued online events for this guild per burst window. Default: 8. */
  burstLimit?: number;
  /** Sliding burst-detection window in seconds. Default: 60. */
  burstWindowSeconds?: number;
};
//#endregion
//#region src/channels/chat-type.d.ts
/**
 * Normalized conversation kind shared by channel routing, sessions, and SDK helpers.
 */
type ChatType = "direct" | "group" | "channel";
/**
 * Normalizes channel-specific chat type labels into OpenClaw conversation kinds.
 */
declare function normalizeChatType(raw?: string): ChatType | undefined;
//#endregion
//#region src/infra/exec-safe-bin-policy-profiles.d.ts
type SafeBinProfile = {
  minPositional?: number;
  maxPositional?: number;
  allowedValueFlags?: ReadonlySet<string>;
  allowedBooleanFlags?: ReadonlySet<string>;
  deniedFlags?: ReadonlySet<string>;
  knownLongFlags?: readonly string[];
  knownLongFlagsSet?: ReadonlySet<string>;
  longFlagPrefixMap?: ReadonlyMap<string, string | null>;
};
type SafeBinProfileFixture = {
  minPositional?: number;
  maxPositional?: number;
  allowedValueFlags?: readonly string[];
  deniedFlags?: readonly string[];
};
//#endregion
//#region src/config/types.provider-request.d.ts
/** Authentication override applied to provider requests after model/provider defaults resolve. */
type ConfiguredProviderRequestAuth = {
  mode: "provider-default";
} | {
  mode: "authorization-bearer";
  token: SecretInput;
} | {
  mode: "header";
  headerName: string;
  value: SecretInput;
  prefix?: string;
};
/** TLS material and verification knobs for provider or proxy connections. */
type ConfiguredProviderRequestTls = {
  ca?: SecretInput;
  cert?: SecretInput;
  key?: SecretInput;
  passphrase?: SecretInput;
  serverName?: string;
  insecureSkipVerify?: boolean;
};
/** Proxy selection for provider requests, including optional TLS settings for proxy transport. */
type ConfiguredProviderRequestProxy = {
  mode: "env-proxy";
  tls?: ConfiguredProviderRequestTls;
} | {
  mode: "explicit-proxy";
  url: string;
  tls?: ConfiguredProviderRequestTls;
};
/** Shared provider request overrides used by model providers and media/tool providers. */
type ConfiguredProviderRequest = {
  headers?: Record<string, SecretInput>;
  auth?: ConfiguredProviderRequestAuth;
  proxy?: ConfiguredProviderRequestProxy;
  tls?: ConfiguredProviderRequestTls;
};
/** Model-provider request overrides plus the private-network opt-in used by model transports. */
type ConfiguredModelProviderRequest = ConfiguredProviderRequest & {
  allowPrivateNetwork?: boolean;
};
//#endregion
//#region src/config/types.tools.d.ts
type SchemaToolsConfig = NonNullable<z.input<typeof ToolsSchema>>;
type SchemaMediaConfig = NonNullable<SchemaToolsConfig["media"]>;
type SchemaAudioConfig = NonNullable<SchemaMediaConfig["audio"]>;
type MediaUnderstandingScopeMatch = {
  /** Channel/provider id to match before running media or link understanding. */
  channel?: string;
  /** Direct/group classification from the channel runtime, when available. */
  chatType?: ChatType;
  /** Attachment or link key prefix used for narrow per-source routing. */
  keyPrefix?: string;
};
type MediaUnderstandingScopeRule = {
  /** Policy applied when match criteria select this scope rule. */
  action: SessionSendPolicyAction;
  /** Optional match filter; omitted match behaves as a catch-all rule. */
  match?: MediaUnderstandingScopeMatch;
};
type MediaUnderstandingScopeConfig = {
  /** Fallback action when no scope rule matches. */
  default?: SessionSendPolicyAction;
  /** Ordered allow/block rules; first matching rule wins. */
  rules?: MediaUnderstandingScopeRule[];
};
type MediaUnderstandingModelConfig = Omit<NonNullable<NonNullable<SchemaMediaConfig["models"]>[number]>, "request"> & {
  request?: ConfiguredProviderRequest;
};
type MediaUnderstandingConfig = Omit<SchemaAudioConfig, "scope" | "request"> & {
  scope?: MediaUnderstandingScopeConfig;
  request?: ConfiguredProviderRequest;
  /** Ordered model list (fallbacks in order). */
  models?: MediaUnderstandingModelConfig[];
  /** Internal request-scoped prompt override injected by CLI/runtime wrappers. */
  _requestPromptOverride?: string;
  /** Internal request-scoped language override injected by CLI/runtime wrappers. */
  _requestLanguageOverride?: string;
};
/** Per-capability defaults and policy. Models live only in tools.media.models. */
type MediaUnderstandingCapabilityConfig = Omit<MediaUnderstandingConfig, "models">;
type LinkToolsConfig = Omit<NonNullable<SchemaToolsConfig["links"]>, "scope"> & {
  scope?: MediaUnderstandingScopeConfig;
};
type MediaToolsConfig = {
  /** Canonical model list for image/audio/video, selected by capability tags. */
  models?: MediaUnderstandingModelConfig[];
  /** Max concurrent media understanding runs. */
  concurrency?: number;
  image?: MediaUnderstandingCapabilityConfig;
  audio?: MediaUnderstandingCapabilityConfig;
  video?: MediaUnderstandingCapabilityConfig;
};
type ToolProfileId = NonNullable<SchemaToolsConfig["profile"]>;
type ToolLoopDetectionConfig = NonNullable<SchemaToolsConfig["loopDetection"]>;
type ToolAllowDenyPolicyConfig = NonNullable<z.input<typeof ToolPolicySchema>>;
type GroupToolPolicyConfig = ToolAllowDenyPolicyConfig;
/**
 * Per-sender overrides.
 *
 * Prefer explicit key prefixes:
 * - channel:<channelId>:<senderId>
 * - id:<senderId>
 * - e164:<phone>
 * - username:<handle>
 * - name:<display-name>
 * - * (wildcard)
 *
 * Legacy unprefixed keys are supported for backward compatibility and are matched as senderId only.
 */
type GroupToolPolicyBySenderConfig = Record<string, GroupToolPolicyConfig>;
type ExecToolConfig = Omit<NonNullable<SchemaToolsConfig["exec"]>, "safeBinProfiles"> & {
  /** Preserve readonly authoring fixtures accepted by the safe-bin policy owner. */
  safeBinProfiles?: Record<string, SafeBinProfileFixture>;
};
type AgentToolsConfig = Omit<NonNullable<z.input<typeof AgentEntrySchema>["tools"]>, "toolsBySender" | "exec" | "elevated"> & {
  toolsBySender?: GroupToolPolicyBySenderConfig;
  exec?: ExecToolConfig;
  elevated?: {
    enabled?: boolean;
    allowFrom?: AgentElevatedAllowFromConfig;
  };
};
type ToolsConfig = Omit<SchemaToolsConfig, "toolsBySender" | "media" | "web" | "exec" | "elevated" | "links"> & {
  toolsBySender?: GroupToolPolicyBySenderConfig;
  media?: MediaToolsConfig;
  exec?: ExecToolConfig;
  elevated?: AgentToolsConfig["elevated"];
  links?: LinkToolsConfig;
  web?: {
    search?: {
      /** Enable managed web_search and optional Codex-native web search. */
      enabled?: boolean;
      /** Search provider id. */
      provider?: string;
      /** Default search results count (1-10). */
      maxResults?: number;
      /** Timeout in seconds for search requests. */
      timeoutSeconds?: number;
      /** Cache TTL in minutes for search results. */
      cacheTtlMinutes?: number;
      /** Optional native Codex web search for Codex-capable models. */
      openaiCodex?: {
        /** Enable native Codex web search for eligible models. */
        enabled?: boolean;
        /** Prefer cached or explicitly request live access. Unrestricted Codex turns resolve cached to live. */
        mode?: "cached" | "live";
        /** Native Codex search allowlist; also gates web_fetch on native-hosted-search turns. */
        allowedDomains?: string[];
        /** Optional Codex native search context size hint. */
        contextSize?: "low" | "medium" | "high";
        /** Optional approximate user location passed to the native Codex tool. */
        userLocation?: {
          country?: string;
          region?: string;
          city?: string;
          timezone?: string;
        };
      };
    };
    fetch?: NonNullable<SchemaToolsConfig["web"]>["fetch"];
  };
};
//#endregion
//#region src/config/types.tts.d.ts
type TtsConfigInput = NonNullable<z.input<typeof TtsConfigSchema>>;
type TtsProviderConfigInput = NonNullable<TtsConfigInput["providers"]>[string];
type TtsProvider = NonNullable<TtsConfigInput["provider"]>;
type TtsMode = NonNullable<TtsConfigInput["mode"]>;
type TtsAutoMode = NonNullable<TtsConfigInput["auto"]>;
type TtsModelOverrideConfig = NonNullable<TtsConfigInput["modelOverrides"]>;
type TtsProviderConfig = Record<string, unknown> & Pick<TtsProviderConfigInput, "apiKey">;
type TtsProviderConfigMap = Record<string, TtsProviderConfig>;
type TtsPersonaConfigInput = NonNullable<TtsConfigInput["personas"]>[string];
type TtsPersonaConfig = Omit<TtsPersonaConfigInput, "providers"> & {
  providers?: TtsProviderConfigMap;
};
type TtsPersonaFallbackPolicy = NonNullable<TtsPersonaConfig["fallbackPolicy"]>;
type ResolvedTtsPersona = TtsPersonaConfig & {
  id: string;
};
type TtsConfig = Omit<TtsConfigInput, "personas" | "providers"> & {
  personas?: Record<string, TtsPersonaConfig>;
  providers?: TtsProviderConfigMap;
};
//#endregion
//#region src/config/types.discord.d.ts
type DiscordChannelStreamingConfig = Omit<ChannelPreviewStreamingConfig, "progress"> & {
  progress?: ChannelStreamingProgressConfig;
};
type DiscordPluralKitConfig = {
  enabled?: boolean;
  token?: string;
};
type DiscordMentionAliasesConfig = Record<string, string>;
type DiscordDmConfig = {
  /** If false, ignore all incoming Discord DMs. Default: true. */
  enabled?: boolean;
  /** If true, allow group DMs (default: false). */
  groupEnabled?: boolean;
  /** Optional allowlist for group DM channels (ids or slugs). */
  groupChannels?: string[];
};
type DiscordGuildChannelConfig = {
  requireMention?: boolean;
  /**
   * If true, drop messages addressed to another identity by mention or bot reply, but not this
   * bot (not @everyone/@here).
   * Default: false.
   */
  ignoreOtherMentions?: boolean;
  /** Optional tool policy overrides for this channel. */
  tools?: GroupToolPolicyConfig;
  toolsBySender?: GroupToolPolicyBySenderConfig;
  /** If specified, only load these skills for this channel. Omit = all skills; empty = no skills. */
  skills?: string[];
  /** If false, disable the bot for this channel. */
  enabled?: boolean;
  /** Optional allowlist for channel senders (ids or names). */
  users?: string[];
  /** Optional allowlist for channel senders by role ID. */
  roles?: string[];
  /** Optional system prompt snippet for this channel. */
  systemPrompt?: string;
  /** If false, omit thread starter context for this channel (default: true). */
  includeThreadStarter?: boolean;
  /** If true, automatically create a thread for each new message in this channel. */
  autoThread?: boolean;
  /** Archive duration (minutes) for auto-created threads. Valid values: 60, 1440, 4320, 10080. */
  autoArchiveDuration?: "60" | "1440" | "4320" | "10080" | 60 | 1440 | 4320 | 10080;
  /** Naming strategy for auto-created threads. "message" uses message text; "generated" renames with an LLM title. */
  autoThreadName?: "message" | "generated";
};
type DiscordReactionNotificationMode = "off" | "own" | "all" | "allowlist";
type DiscordGuildEntry = {
  slug?: string;
  requireMention?: boolean;
  /**
   * If true, drop messages addressed to another identity by mention or bot reply, but not this
   * bot (not @everyone/@here).
   * Default: false.
   */
  ignoreOtherMentions?: boolean;
  /** Optional tool policy overrides for this guild (used when channel override is missing). */
  tools?: GroupToolPolicyConfig;
  toolsBySender?: GroupToolPolicyBySenderConfig;
  /** Reaction notification mode (off|own|all|allowlist). Default: own. */
  reactionNotifications?: DiscordReactionNotificationMode;
  /** Optional allowlist for guild senders (ids or names). */
  users?: string[];
  /** Optional allowlist for guild senders by role ID. */
  roles?: string[];
  presenceEvents?: DiscordPresenceEventsConfig;
  channels?: Record<string, DiscordGuildChannelConfig>;
};
type DiscordActionConfig = {
  reactions?: boolean;
  stickers?: boolean;
  polls?: boolean;
  permissions?: boolean;
  messages?: boolean;
  threads?: boolean;
  pins?: boolean;
  search?: boolean;
  memberInfo?: boolean;
  roleInfo?: boolean;
  roles?: boolean;
  channelInfo?: boolean;
  voiceStatus?: boolean;
  events?: boolean;
  moderation?: boolean;
  emojiUploads?: boolean;
  stickerUploads?: boolean;
  channels?: boolean;
  /** Enable bot presence/activity changes (default: false). */
  presence?: boolean;
};
type DiscordIntentsConfig = {
  /**
   * Request the privileged Message Content intent. Disable only for mention-only guild operation;
   * Discord still includes content in DMs and messages that explicitly mention the bot. Default: true.
   */
  messageContent?: boolean;
  /** Enable Guild Presences privileged intent (requires Portal opt-in). Default: false. */
  presence?: boolean;
  /** Enable Guild Members privileged intent (requires Portal opt-in). Default: false. */
  guildMembers?: boolean;
  /** Enable Guild Voice States intent. Defaults to voice.enabled, unless explicitly set. */
  voiceStates?: boolean;
};
type DiscordVoiceAutoJoinConfig = {
  /** Guild ID that owns the voice channel. */
  guildId: string;
  /** Voice channel ID to join. */
  channelId: string;
  /** Join and remain connected only while at least one human is in the channel. Default: false. */
  whenOccupied?: boolean;
};
type DiscordVoiceAllowedChannelConfig = {
  /** Guild ID that owns the voice channel. */
  guildId: string;
  /** Voice channel ID allowed for realtime voice sessions. */
  channelId: string;
};
type DiscordVoiceMode = "stt-tts" | "agent-proxy" | "bidi";
type DiscordVoiceRealtimeConsultPolicy = "auto" | "always";
type DiscordVoiceRealtimeToolPolicy = "safe-read-only" | "owner" | "none";
type DiscordVoiceRealtimeBootstrapContextFile = "IDENTITY.md" | "USER.md" | "SOUL.md";
type DiscordVoiceRealtimeConfig = {
  /** Realtime voice provider id, for example "openai". */
  provider?: string;
  /** Provider realtime session model, for example "gpt-realtime-2.1". */
  model?: string;
  /** Provider realtime output voice name, for example "cedar". */
  speakerVoice?: string;
  /** Provider realtime output voice id. */
  speakerVoiceId?: string;
  /** System instructions passed to the realtime provider. */
  instructions?: string;
  /** Tool policy for bidi realtime consult calls. */
  toolPolicy?: DiscordVoiceRealtimeToolPolicy;
  /** Whether bidi should force the OpenClaw agent brain for every substantive turn. */
  consultPolicy?: DiscordVoiceRealtimeConsultPolicy;
  /** OpenAI agent-proxy wake-name policy. Unset adapts to the room: off for one human, on for two or more. True always requires; false never requires. */
  requireWakeName?: boolean;
  /** Wake names that allow OpenAI agent-proxy realtime Discord voice to respond when the gate is active. Defaults to the routed agent name plus OpenClaw, or the agent id plus OpenClaw. */
  wakeNames?: string[];
  /** Agent profile bootstrap files to include in realtime provider instructions. Defaults to IDENTITY.md, USER.md, and SOUL.md; set [] to disable. */
  bootstrapContextFiles?: DiscordVoiceRealtimeBootstrapContextFile[];
  /** Allow Discord speaker-start events to interrupt active realtime playback. */
  bargeIn?: boolean;
  /** Minimum assistant playback duration before a barge-in truncates audio. Default: 250ms; set 0 for immediate interruption. */
  minBargeInAudioEndMs?: number;
  /** Debounce window before buffered transcripts are sent to the OpenClaw agent. */
  debounceMs?: number;
  /** Provider-specific realtime voice config keyed by provider id. */
  providers?: Record<string, Record<string, unknown> | undefined>;
};
type DiscordVoiceAgentSessionConfig = {
  /** Which OpenClaw conversation should receive voice turns. Default: "voice". */
  mode?: "voice" | "target";
  /** Discord target used when mode is "target", for example "channel:123". */
  target?: string;
};
type DiscordVoiceConfig = {
  /** Enable Discord voice channel conversations (default: true). */
  enabled?: boolean;
  /** Voice conversation mode. Default: agent-proxy. */
  mode?: DiscordVoiceMode;
  /** Route voice turns through an existing OpenClaw Discord conversation. */
  agentSession?: DiscordVoiceAgentSessionConfig;
  /** Optional LLM model override for Discord voice channel responses. */
  model?: string;
  /** Realtime provider settings for agent-proxy or bidi modes. */
  realtime?: DiscordVoiceRealtimeConfig;
  /** Voice channels to join automatically, optionally only while occupied. */
  autoJoin?: DiscordVoiceAutoJoinConfig[];
  /** If false, configured followUsers are ignored without removing the saved user list. */
  followUsersEnabled?: boolean;
  /** Discord user IDs whose current voice channel the bot should follow. */
  followUsers?: string[];
  /** Voice channels the bot is allowed to join or remain in. Unset means any voice channel is allowed. */
  allowedChannels?: DiscordVoiceAllowedChannelConfig[];
  /** Enable/disable DAVE end-to-end encryption (default: true; Discord may require this). */
  daveEncryption?: boolean;
  /** Consecutive decrypt failures before DAVE session reinitialization (default: 24). */
  decryptionFailureTolerance?: number;
  /** Initial @discordjs/voice Ready wait in milliseconds (default: 30000). */
  connectTimeoutMs?: number;
  /** Grace period for Discord voice reconnect signalling after a disconnect (default: 15000). */
  reconnectGraceMs?: number;
  /** Silence grace after Discord reports a speaker ended before finalizing STT capture (default: 2000). */
  captureSilenceGraceMs?: number;
  /** Optional TTS overrides for Discord voice output. */
  tts?: TtsConfig;
};
type DiscordExecApprovalConfig = ChannelExecApprovalConfig<string> & {
  /** Delete approval DMs after approval, denial, or timeout. Default: false. */
  cleanupAfterResolve?: boolean;
};
type DiscordAgentComponentsConfig = {
  /** Enable agent-controlled interactive components (buttons, select menus). Default: true. */
  enabled?: boolean;
  /** Time in milliseconds before sent Discord component callbacks expire. Default: 1800000. */
  ttlMs?: number;
};
type DiscordThreadBindingsConfig = {
  /** Enable Discord thread binding features. Overrides session.threadBindings.enabled. */
  enabled?: boolean;
  /** Inactivity window in hours. Set 0 to disable. Default: 24. */
  idleHours?: number;
  /** Hard max age in hours. Set 0 to disable. Default: 0. */
  maxAgeHours?: number;
  /** Allow session spawns to create and bind Discord threads. Default: true. */
  spawnSessions?: boolean;
  /** Default context mode for native subagents. Default: fork. */
  defaultSpawnContext?: "isolated" | "fork";
};
type DiscordSlashCommandConfig = {
  /** Reply ephemerally (default: true). */
  ephemeral?: boolean;
};
type DiscordThreadConfig = {
  /** If true, Discord thread sessions inherit the parent channel transcript. Default: false. */
  inheritParent?: boolean;
};
type DiscordAutoPresenceConfig = {
  /** Enable automatic runtime/quota-based Discord presence updates. Default: false. */
  enabled?: boolean;
  /** Poll interval for evaluating runtime availability state (ms). Default: 30000. */
  intervalMs?: number;
  /** Minimum spacing between actual gateway presence updates (ms). Default: 15000. */
  minUpdateIntervalMs?: number;
  /** Optional custom status text while runtime is healthy; supports plain text. */
  /** Optional custom status text while runtime/quota state is degraded or unknown. */
  /** Optional custom status text while runtime detects quota/token exhaustion. */
  /** @deprecated Doctor-only legacy input. */
  exhaustedText?: string;
};
type DiscordAccountConfig = Omit<CommonChannelMessagingConfig<string[], string, string, DiscordChannelStreamingConfig>, "groupAllowFrom"> & ChannelBotInteractionConfig & ChannelReactionConfig<never, never, string> & {
  /** Post a room-specific introduction when joining a group. Default: true. */
  joinIntro?: boolean;
  /** Override native command registration for Discord (bool or "auto"). */
  commands?: ProviderCommandsConfig;
  token?: SecretInput;
  /** Optional Discord application/client ID. Set this when REST application lookup is blocked. */
  applicationId?: string;
  activities?: {
    clientSecret?: string;
    applicationId?: string;
  };
  /** HTTP(S) proxy URL for Discord gateway WebSocket connections. */
  proxy?: string;
  /**
   * Deterministic outbound @handle rewrites for known Discord users.
   * Keys are handles without the leading @; values are Discord user IDs.
   */
  mentionAliases?: DiscordMentionAliasesConfig;
  /**
   * Suppress Discord-generated link embeds for outbound messages. Default: true.
   * Explicit `embeds` payloads are still sent normally.
   */
  suppressEmbeds?: boolean;
  /**
   * Soft max line count per Discord message.
   * Discord clients can clip/collapse very tall messages; splitting by lines
   * keeps replies readable in-channel. Default: 17.
   */
  maxLinesPerMessage?: number;
  /** Per-action tool gating (default: true for all). */
  actions?: DiscordActionConfig;
  /** Thread session behavior. */
  thread?: DiscordThreadConfig;
  dm?: DiscordDmConfig;
  /** New per-guild config keyed by guild id or slug. */
  guilds?: Record<string, DiscordGuildEntry>;
  /** Exec approval forwarding configuration. */
  execApprovals?: DiscordExecApprovalConfig;
  /** Agent-controlled interactive components (buttons, select menus). */
  agentComponents?: DiscordAgentComponentsConfig;
  /** Discord UI customization (components, modals, etc.). */
  /** Slash command configuration. */
  slashCommand?: DiscordSlashCommandConfig;
  /** Thread binding lifecycle settings. */
  threadBindings?: DiscordThreadBindingsConfig;
  /** Privileged Gateway Intents (must also be enabled in Discord Developer Portal). */
  intents?: DiscordIntentsConfig;
  /** Voice channel conversation settings. */
  voice?: DiscordVoiceConfig;
  /** PluralKit identity resolution for proxied messages. */
  pluralkit?: DiscordPluralKitConfig;
  /** When to send ack reactions for this Discord account. Overrides messages.ackReactionScope. */
  ackReactionScope?: "group-mentions" | "group-all" | "direct" | "all" | "off" | "none";
  /** Bot activity status text (e.g. "Watching X"). */
  activity?: string;
  /** Bot status (online|dnd|idle|invisible). Defaults to online when presence is configured. */
  status?: "online" | "dnd" | "idle" | "invisible";
  /** Automatic runtime/quota presence signaling (status text + status mapping). */
  autoPresence?: DiscordAutoPresenceConfig;
  /** Activity type (0=Game, 1=Streaming, 2=Listening, 3=Watching, 4=Custom, 5=Competing). Defaults to 4 (Custom) when activity is set. */
  activityType?: 0 | 1 | 2 | 3 | 4 | 5;
  /** Streaming URL (Twitch/YouTube). Required when activityType=1. */
  activityUrl?: string;
  /**
   * Legacy compatibility block. Discord no longer enforces channel-owned
   * timeouts for queued inbound agent runs.
   */
  inboundWorker?: {
    /**
     * Ignored. Queued Discord agent runs are governed by the session/tool/runtime
     * lifecycle, not by Discord channel config.
     */
    runTimeoutMs?: number;
  };
};
type DiscordConfig = {
  /** Optional per-account Discord configuration (multi-account). */
  accounts?: Record<string, DiscordAccountConfig>;
  /** Optional default account id when multiple accounts are configured. */
  defaultAccount?: string;
} & DiscordAccountConfig;
//#endregion
//#region src/config/types.googlechat.d.ts
type GoogleChatDmConfig = {
  /** If false, ignore all incoming Google Chat DMs. Default: true. */
  enabled?: boolean;
};
type GoogleChatGroupConfig = {
  /** If false, disable the bot in this space. */
  enabled?: boolean;
  /** Require mentioning the bot to trigger replies. */
  requireMention?: boolean;
  /** Sliding-window bot-pair loop guard for accepted bot-authored Google Chat messages. */
  botLoopProtection?: ChannelBotLoopProtectionConfig;
  /** Allowlist of users that can invoke the bot in this space. */
  users?: Array<string | number>;
  /** Optional system prompt for this space. */
  systemPrompt?: string;
};
type GoogleChatAccountConfig = Omit<CommonChannelMessagingConfig, "mentionPatterns"> & ChannelBotInteractionConfig<boolean> & {
  /** Default mention requirement for space messages (default: true). */
  requireMention?: boolean;
  /** Per-space configuration keyed by space id or name. */
  groups?: Record<string, GoogleChatGroupConfig>;
  /** Service account JSON (inline string, object, or secret reference). */
  serviceAccount?: string | Record<string, unknown> | SecretRef;
  /** Service account JSON file path. */
  serviceAccountFile?: string;
  /** Webhook audience type (app-url or project-number). */
  audienceType?: "app-url" | "project-number";
  /** Audience value (app URL or project number). */
  audience?: string;
  /** Exact add-on principal to accept when app-url delivery uses add-on tokens. */
  appPrincipal?: string;
  /** Google Chat webhook path (default: /googlechat). */
  webhookPath?: string;
  /** Google Chat webhook URL (used to derive the path). */
  webhookUrl?: string;
  /** Optional bot user resource name (users/...). */
  botUser?: string;
  /** If false, ignore all incoming Google Chat DMs. Default: true. */
  dm?: GoogleChatDmConfig;
  /**
   * Typing indicator mode (default: "message").
   * - "none": No indicator
   * - "message": Send "_<name> is typing..._" then edit with response
   * - "reaction": React with 👀 to user message, remove on reply
   *   NOTE: Reaction mode requires user OAuth (not supported with service account auth).
   *   If configured, falls back to message mode with a warning.
   */
  typingIndicator?: "none" | "message" | "reaction";
};
type GoogleChatConfig = {
  /** Optional per-account Google Chat configuration (multi-account). */
  accounts?: Record<string, GoogleChatAccountConfig>;
  /** Optional default account id when multiple accounts are configured. */
  defaultAccount?: string;
} & GoogleChatAccountConfig;
//#endregion
//#region src/config/types.imessage.d.ts
/** Private-API and helper actions the iMessage runtime may expose to agents. */
type IMessageActionConfig = {
  reactions?: boolean;
  edit?: boolean;
  unsend?: boolean;
  reply?: boolean;
  sendWithEffect?: boolean;
  renameGroup?: boolean;
  setGroupIcon?: boolean;
  addParticipant?: boolean;
  removeParticipant?: boolean;
  leaveGroup?: boolean;
  sendAttachment?: boolean;
  polls?: boolean;
};
/** Inbound tapback notification policy. */
type IMessageReactionNotificationMode = "off" | "own" | "all";
type IMessageSendTransport = "auto" | "bridge" | "applescript";
/** Per-account iMessage runtime/config shape. */
type IMessageAccountConfig = Omit<CommonChannelMessagingConfig, "mentionPatterns" | "replyToMode"> & ChannelReadReceiptConfig & ChannelReactionConfig<IMessageReactionNotificationMode> & {
  /** imsg CLI binary path (default: imsg). */
  cliPath?: string;
  /** Optional Messages db path override. */
  dbPath?: string;
  /** Remote SSH host token for SCP attachment fetches (`host` or `user@host`). */
  remoteHost?: string;
  /** Enable or disable private API message actions. */
  actions?: IMessageActionConfig;
  /** Optional default send service (imessage|sms|auto). */
  service?: "imessage" | "sms" | "auto";
  /** Preferred imsg RPC send transport. Default: auto. */
  sendTransport?: IMessageSendTransport;
  /** Optional default region (used when sending SMS). */
  region?: string;
  /** Include attachments + reactions in watch payloads. */
  includeAttachments?: boolean;
  /** Allowed local iMessage attachment roots (supports single-segment `*` wildcards). */
  attachmentRoots?: string[];
  /** Allowed remote iMessage attachment roots for SCP fetches (supports `*`). */
  remoteAttachmentRoots?: string[];
  /** Timeout for probe/RPC operations in milliseconds (default: 10000). */
  probeTimeoutMs?: number;
  /**
   * Merge consecutive same-sender DM rows from `chat.db` into a single agent
   * turn, so Apple's split-send (`<command> <URL>` arriving as two separate
   * rows several seconds apart) lands as one merged message. DM-only — group chats
   * keep instant per-message dispatch. Widens the default inbound debounce
   * window to 7000 ms when enabled without an explicit
   * `messages.inbound.byChannel.imessage` or global
   * `messages.inbound.debounceMs`. Default: `false`.
   */
  groups?: Record<string, {
    requireMention?: boolean;
    tools?: GroupToolPolicyConfig;
    toolsBySender?: GroupToolPolicyBySenderConfig;
    /**
     * Per-group system prompt. Injected into the agent's system prompt on
     * every turn that handles a message in that group. Matches the shape
     * already supported by Discord, Telegram, IRC, Slack, GoogleChat, and
     * other group-capable channels. The wildcard `groups["*"]` entry is
     * also honored.
     */
    systemPrompt?: string;
  }>;
  /**
   * Catchup: replay inbound messages that arrived in `chat.db` while the
   * gateway was offline (crash, restart, mac sleep). Disabled by default.
   * See https://github.com/openclaw/openclaw/issues/78649.
   */
  catchup?: {
    /** Master switch. Default `false`. */
    enabled?: boolean;
    /**
     * Maximum age of replayable messages in minutes. Messages older than
     * `now - maxAgeMinutes` are skipped even when the cursor is older.
     * Defense against runaway replay (the inverse of #62761). Default
     * `120` (2 h). Clamp `[1, 720]`.
     */
    maxAgeMinutes?: number;
    /**
     * Maximum messages to replay per catchup pass. Default `50`. Clamp
     * `[1, 500]`.
     */
    perRunLimit?: number;
    /**
     * On first run when no cursor exists, look back this many minutes.
     * Default `30`.
     */
    firstRunLookbackMinutes?: number;
    /**
     * Per-message retry ceiling. After this many consecutive failed
     * dispatch attempts against the same message guid, catchup logs a
     * `warn` and force-advances the cursor past the wedged message.
     * Default `10`. Clamp `[1, 1000]`.
     */
    maxFailureRetries?: number;
  };
};
/** Top-level iMessage config, with optional account map layered over default account fields. */
type IMessageConfig = {
  /** Optional per-account iMessage configuration (multi-account). */
  accounts?: Record<string, IMessageAccountConfig>;
  /** Optional default account id when multiple accounts are configured. */
  defaultAccount?: string;
} & IMessageAccountConfig;
//#endregion
//#region src/config/types.implicit-mentions.d.ts
type ChannelImplicitMentionsConfig = {
  /** Treat replies to the bot's own message as implicit mentions. */
  replyToBot?: boolean;
  /** Treat quoted bot messages as implicit mentions. */
  quotedBot?: boolean;
  /** Treat follow-ups in threads the bot participated in as implicit mentions. */
  threadParticipation?: boolean;
};
//#endregion
//#region src/config/types.irc.d.ts
type IrcAccountConfig = Omit<CommonChannelMessagingConfig, "mentionPatterns"> & {
  /** IRC server hostname (example: irc.example.com). */
  host?: string;
  /** IRC server port (default: 6697 with TLS, otherwise 6667). */
  port?: number;
  /** Use TLS for IRC connection (default: true). */
  tls?: boolean;
  /** IRC nickname to identify this bot. */
  nick?: string;
  /** IRC USER field username (defaults to nick). */
  username?: string;
  /** IRC USER field realname (default: OpenClaw). */
  realname?: string;
  /** Optional IRC server password (sensitive). */
  password?: string;
  /** Optional file path containing IRC server password. */
  passwordFile?: string;
  /** Optional NickServ identify/register settings. */
  nickserv?: {
    /** Enable NickServ identify/register after connect (default: enabled when password is set). */
    enabled?: boolean;
    /** NickServ service nick (default: NickServ). */
    service?: string;
    /** NickServ password (sensitive). */
    password?: string;
    /** Optional file path containing NickServ password. */
    passwordFile?: string;
    /** If true, send NickServ REGISTER on connect. */
    register?: boolean;
    /** Email used with NickServ REGISTER. */
    registerEmail?: string;
  };
  /** Auto-join channel list at connect (example: ["#openclaw"]). */
  channels?: string[];
  /** Outbound text chunk size (chars). Default: 350. */
  textChunkLimit?: number;
  groups?: Record<string, {
    requireMention?: boolean;
    tools?: GroupToolPolicyConfig;
    toolsBySender?: GroupToolPolicyBySenderConfig;
    allowFrom?: Array<string | number>;
    skills?: string[];
    enabled?: boolean;
    systemPrompt?: string;
  }>;
};
type IrcConfig = {
  /** Optional per-account IRC configuration (multi-account). */
  accounts?: Record<string, IrcAccountConfig>;
  /** Optional default account id when multiple accounts are configured. */
  defaultAccount?: string;
} & IrcAccountConfig;
//#endregion
//#region src/config/types.msteams.d.ts
type MSTeamsWebhookConfig = {
  /** Port for the webhook server. Default: 3978. */
  port?: number;
  /** Path for the messages endpoint. Default: /api/messages. */
  path?: string;
};
/** Teams SDK cloud environment. Public cloud is the default. */
type MSTeamsCloudName = "Public" | "USGov" | "USGovDoD" | "China";
/**
 * Bot Framework OAuth SSO configuration for Microsoft Teams.
 *
 * When enabled, the plugin handles the `signin/tokenExchange` and
 * `signin/verifyState` invoke activities that Teams sends after an
 * `oauthCard` is presented to the user. The exchanged user token is
 * persisted via the Bot Framework User Token service so downstream
 * tools can call Microsoft Graph with delegated permissions.
 *
 * Prerequisites (Azure portal):
 * - The bot's Azure AD (Entra) app is configured with an exposed API
 *   scope (for example `access_as_user`) and lists the Teams client
 *   IDs in `knownClientApplications`.
 * - The Bot Framework channel registration has an OAuth Connection
 *   Setting whose name matches `connectionName` below, pointing at
 *   the same Azure AD app.
 */
type MSTeamsSsoConfig = {
  /** If true, handle signin/tokenExchange + signin/verifyState invokes. Default: false. */
  enabled?: boolean;
  /**
   * Name of the OAuth connection configured on the Bot Framework channel
   * registration (Azure Bot resource). Required when `enabled` is true.
   */
  connectionName?: string;
};
/** Reply style for MS Teams messages. */
type MSTeamsReplyStyle = "thread" | "top-level";
/** Channel-level config for MS Teams. */
type MSTeamsChannelConfig = {
  /** Require @mention to respond. Default: true. */
  requireMention?: boolean;
  /** Optional tool policy overrides for this channel. */
  tools?: GroupToolPolicyConfig;
  toolsBySender?: GroupToolPolicyBySenderConfig;
  /** Reply style: "thread" replies to the message, "top-level" posts a new message. */
  replyStyle?: MSTeamsReplyStyle;
};
/** Team-level config for MS Teams. */
type MSTeamsTeamConfig = {
  /** Default requireMention for channels in this team. */
  requireMention?: boolean;
  /** Default tool policy for channels in this team. */
  tools?: GroupToolPolicyConfig;
  toolsBySender?: GroupToolPolicyBySenderConfig;
  /** Default reply style for channels in this team. */
  replyStyle?: MSTeamsReplyStyle;
  /** Per-channel overrides. Key is conversation ID (e.g., "19:...@thread.tacv2"). */
  channels?: Record<string, MSTeamsChannelConfig>;
};
type MSTeamsConfig = Omit<CommonChannelMessagingConfig<string[], string, string, ChannelPreviewStreamingConfig>, "mentionPatterns" | "name" | "replyToMode"> & Pick<ChannelBotInteractionConfig<boolean>, "dangerouslyAllowNameMatching"> & {
  /** Azure Bot App ID (from Azure Bot registration). */
  appId?: string;
  /** Azure Bot App Password / Client Secret. */
  appPassword?: SecretInput;
  /** Azure AD Tenant ID (for single-tenant bots). */
  tenantId?: string;
  /** Teams SDK cloud environment. Default: Public. */
  cloud?: MSTeamsCloudName;
  /**
   * Bot Connector service URL used by SDK proactive sends/edits/deletes.
   * Set with `cloud` for USGov/DoD SDK clouds; set alone for GCC.
   */
  serviceUrl?: string;
  /**
   * Authentication type.
   * - `"secret"` (default): uses `appPassword` (client secret).
   * - `"federated"`: uses workload identity / managed identity / certificate.
   */
  authType?: "secret" | "federated";
  /** Path to a PEM certificate file for certificate-based auth. Used when `authType` is `"federated"`. */
  certificatePath?: string;
  /** Certificate thumbprint (hex SHA-1) for certificate-based auth. */
  certificateThumbprint?: string;
  /** If `true`, use Azure Managed Identity (system- or user-assigned) instead of a certificate. */
  useManagedIdentity?: boolean;
  /** User-assigned managed-identity client ID. When omitted with `useManagedIdentity: true`, system-assigned identity is used. */
  managedIdentityClientId?: string;
  /** Webhook server configuration. */
  webhook?: MSTeamsWebhookConfig;
  /** Send native Teams typing indicator before replies. Default: true for groups/channels; DMs use informative stream status. */
  typingIndicator?: boolean;
  /**
   * Allowed host suffixes for inbound attachment downloads.
   * Use ["*"] to allow any host (not recommended).
   */
  mediaAllowHosts?: Array<string>;
  /**
   * Allowed host suffixes for attaching Authorization headers to inbound media retries.
   * Use specific hosts only; avoid multi-tenant suffixes.
   */
  mediaAuthAllowHosts?: Array<string>;
  /**
   * Query Graph for channel/group media when Bot Framework HTML omits file markers.
   * Requires the documented Graph permissions and adds one message lookup per
   * otherwise unresolved HTML activity. Default: false.
   */
  graphMediaFallback?: boolean;
  /** Default: require @mention to respond in channels/groups. */
  requireMention?: boolean;
  /** Default reply style: "thread" replies to the message, "top-level" posts a new message. */
  replyStyle?: MSTeamsReplyStyle;
  /** Per-team config. Key is team ID (from the /team/ URL path segment). */
  teams?: Record<string, MSTeamsTeamConfig>;
  /** SharePoint site ID for file uploads in group chats/channels (e.g., "contoso.sharepoint.com,guid1,guid2"). */
  sharePointSiteId?: string;
  /** Show a welcome Adaptive Card when the bot is added to a 1:1 chat. Default: true. */
  welcomeCard?: boolean;
  /** Custom prompt starter labels shown on the welcome card. */
  promptStarters?: string[];
  /** Show a welcome message when the bot is added to a group chat. Default: false. */
  groupWelcomeCard?: boolean;
  /** Enable the Teams feedback loop (thumbs up/down) on AI-generated messages. Default: true. */
  feedbackEnabled?: boolean;
  /** Enable background reflection when a user gives negative feedback. Default: true. */
  feedbackReflection?: boolean;
  /** Minimum interval (ms) between reflections per session. Default: 300000 (5 min). */
  feedbackReflectionCooldownMs?: number;
  /** Delegated auth settings for user-scoped Graph API actions (e.g., reactions). */
  delegatedAuth?: {
    /** Enable delegated auth (user sign-in for Graph actions that need user scope). */
    enabled?: boolean;
    /** Additional scopes to request during OAuth consent. */
    scopes?: string[];
  };
  /** Bot Framework OAuth SSO (signin/tokenExchange + signin/verifyState) settings. */
  sso?: MSTeamsSsoConfig;
};
//#endregion
//#region src/config/types.signal.d.ts
type SignalReactionNotificationMode = "off" | "own" | "all" | "allowlist";
type SignalReactionLevel = "off" | "ack" | "minimal" | "extensive";
type SignalTransportConfig = {
  kind: "managed-native";
  /** Optional signal-cli config directory path (passed as --config). */
  configPath?: string;
  /** Opt-in absolute POSIX UNIX socket path; excludes HTTP options. */
  socketPath?: string;
  /** Native daemon connection URL when it differs from the managed bind endpoint. */
  url?: string;
  /** HTTP host for the managed signal-cli daemon (default 127.0.0.1). */
  httpHost?: string;
  /** HTTP port for the managed signal-cli daemon (default 8080). */
  httpPort?: number;
  /** signal-cli binary path (default: signal-cli). */
  cliPath?: string;
  /** Max time to wait for signal-cli daemon startup (ms, cap 120000). */
  startupTimeoutMs?: number;
  receiveMode?: "on-start" | "manual";
  ignoreStories?: boolean;
} | {
  kind: "external-native";
  /** Base URL for an externally managed native signal-cli HTTP daemon. */
  url: string;
} | {
  kind: "container";
  /** Base URL for bbernhard/signal-cli-rest-api. */
  url: string;
};
type SignalGroupConfig = {
  requireMention?: boolean;
  /** Emit internal message hooks for mention-skipped group messages. */
  ingest?: boolean;
  tools?: GroupToolPolicyConfig;
  toolsBySender?: GroupToolPolicyBySenderConfig;
};
type SignalAccountConfig = Omit<CommonChannelMessagingConfig, "mentionPatterns"> & ChannelReadReceiptConfig & ChannelReactionConfig<SignalReactionNotificationMode, SignalReactionLevel, never, true> & {
  /** Optional explicit E.164 account for signal-cli. */
  account?: string;
  /** Optional account UUID for signal-cli (used for loop protection). */
  accountUuid?: string;
  /** Concrete transport owned by this account. Defaults to managed native signal-cli. */
  transport?: SignalTransportConfig;
  /** Skip downloading inbound Signal attachments. */
  ignoreAttachments?: boolean;
  /** OpenClaw-side target aliases keyed by friendly name. */
  aliases?: Record<string, string>;
  /** Per-group overrides keyed by Signal group id (or "*"). */
  groups?: Record<string, SignalGroupConfig>;
  /** Optional per-chat-type native reply quoting overrides. */
  replyToModeByChatType?: Partial<Record<"direct" | "group", ReplyToMode>>;
  /** Action toggles for message tool capabilities. */
  actions?: {
    /** Enable/disable sending reactions via message tool (default: true). */
    reactions?: boolean;
  };
};
type SignalConfig = {
  /** Optional per-account Signal configuration (multi-account). */
  accounts?: Record<string, SignalAccountConfig>;
  /** Optional default account id when multiple accounts are configured. */
  defaultAccount?: string;
} & SignalAccountConfig;
//#endregion
//#region src/config/types.slack.d.ts
type SlackDmConfig = {
  /** If false, ignore all incoming Slack DMs. Default: true. */
  enabled?: boolean;
  /** If true, allow group DMs (default: false). */
  groupEnabled?: boolean;
  /** Optional allowlist for group DM channels (ids or slugs). */
  groupChannels?: Array<string | number>;
};
type SlackChannelConfig = {
  /** If false, disable the bot in this channel. */
  enabled?: boolean;
  /** Require mentioning the bot to trigger replies. */
  requireMention?: boolean;
  /**
   * Ignore room messages that mention another user or user group but not this bot.
   * Requires a resolved bot user ID. Default: false.
   */
  ignoreOtherMentions?: boolean;
  /** Override Slack reply/thread behavior for this channel. */
  replyToMode?: ReplyToMode;
  /** Optional tool policy overrides for this channel. */
  tools?: GroupToolPolicyConfig;
  toolsBySender?: GroupToolPolicyBySenderConfig;
  /** Allow bot-authored messages to trigger replies (default: false). Set to "mentions" to only allow bot messages that @mention this bot. */
  allowBots?: boolean | "mentions";
  /** Sliding-window bot-pair loop guard for accepted bot-authored Slack messages. */
  botLoopProtection?: ChannelBotLoopProtectionConfig;
  /** Allowlist of users that can invoke the bot in this channel. */
  users?: Array<string | number>;
  /** Optional skill filter for this channel. */
  skills?: string[];
  /** Optional system prompt for this channel. */
  systemPrompt?: string;
  /** Slack presence polling and agent wake mode for this channel. */
  presenceEvents?: SlackPresenceEventsConfig;
};
type SlackPresenceEventsMode = "off" | "auto" | "on";
type SlackPresenceEventsConfig = {
  /** Presence wake mode. Default: off. */
  mode?: SlackPresenceEventsMode;
  /** Override the default presence-event guidance. Empty omits guidance. Maximum: 20,000 characters. */
  prompt?: string;
};
type SlackReactionNotificationMode = "off" | "own" | "all" | "allowlist";
type SlackStreamingProgressConfig = ChannelStreamingProgressConfig & {
  /** Slack progress presentation. "compact" keeps one editable text draft. Default: "card". */
  style?: "card" | "compact";
  /** Use Slack-native task cards for card-style progress. Default: true. */
  nativeTaskCards?: boolean;
};
type SlackChannelStreamingConfig = ChannelStreamingConfig<SlackStreamingProgressConfig>;
type SlackExecApprovalConfig = ChannelExecApprovalConfig;
type SlackCapabilitiesConfig = string[];
type SlackActionConfig = {
  reactions?: boolean;
  messages?: boolean;
  pins?: boolean;
  search?: boolean;
  permissions?: boolean;
  memberInfo?: boolean;
  channelInfo?: boolean;
  emojiList?: boolean;
};
type SlackSlashCommandConfig = {
  /** Enable handling for the configured slash command (default: false). */
  enabled?: boolean;
  /** Slash command name (default: "openclaw"). */
  name?: string;
  /** Session key prefix for slash commands (default: "slack:slash"). */
  sessionPrefix?: string;
  /** Reply ephemerally (default: true). */
  ephemeral?: boolean;
};
type SlackThreadConfig = {
  /** Scope for thread history context (thread|channel). Default: thread. */
  historyScope?: "thread" | "channel";
  /** If true, thread sessions inherit the parent channel transcript. Default: false. */
  inheritParent?: boolean;
  /** Maximum number of thread messages to fetch as context when starting a new thread session (default: 20). Set to 0 to disable thread history fetching. */
  initialHistoryLimit?: number;
};
type SlackRelayConfig = {
  /** Full relay websocket URL, including the route path. */
  url?: string;
  /** Bearer token used to authenticate the gateway websocket to the Slack relay. */
  authToken?: SecretInput;
  /** Gateway destination id registered with openclaw-slack-router. */
  gatewayId?: string;
};
type SlackAccountConfig = Omit<CommonChannelMessagingConfig<SlackCapabilitiesConfig, string | number, string, SlackChannelStreamingConfig>, "groupAllowFrom"> & ChannelBotInteractionConfig & ChannelReactionConfig<SlackReactionNotificationMode, never, string, true> & {
  /** Post a room-specific introduction when joining a group. Default: true. */
  joinIntro?: boolean;
  /** @deprecated Doctor-only legacy input. */
  identity?: "bot" | "user";
  /** @deprecated Doctor-only legacy input. */
  socketMode?: {
    clientPingTimeout?: number;
    serverPingTimeout?: number;
    pingPongLoggingEnabled?: boolean;
  };
  /** Slack author identity. Default: bot. */
  postAs?: "bot" | "user";
  /** Slack connection mode (socket|http|relay). Default: socket. */
  mode?: "socket" | "http" | "relay";
  /** Slack SDK Socket Mode transport options. Ignored in HTTP mode. */
  /** Relay-delivered Slack event source. Used when mode is "relay". */
  relay?: SlackRelayConfig;
  /** Slack signing secret (required for HTTP mode). */
  signingSecret?: SecretInput;
  /** Slack Events API webhook path (default: /slack/events). */
  webhookPath?: string;
  /** Slack-native exec approval delivery + approver authorization. */
  execApprovals?: SlackExecApprovalConfig;
  /** Override native command registration for Slack (bool or "auto"). */
  commands?: ProviderCommandsConfig;
  botToken?: SecretInput;
  appToken?: SecretInput;
  userToken?: SecretInput;
  /** If true, restrict user token to read operations only. Default: true. */
  userTokenReadOnly?: boolean;
  /** Default mention requirement for channel messages (default: true). */
  requireMention?: boolean;
  /** Implicit mention policy for replies, quotes, and participated threads. */
  implicitMentions?: ChannelImplicitMentionsConfig;
  /** Pass through Slack chat.postMessage link unfurl control. Default: false. */
  unfurlLinks?: boolean;
  /** Pass through Slack chat.postMessage media unfurl control. Omitted by default. */
  unfurlMedia?: boolean;
  /**
   * Optional per-chat-type reply threading overrides.
   * Example: { direct: "all", group: "first", channel: "off" }.
   */
  replyToModeByChatType?: Partial<Record<"direct" | "group" | "channel", ReplyToMode>>;
  /** Thread session behavior. */
  thread?: SlackThreadConfig;
  /** Poll Slack presence and wake the routed agent on away-to-active transitions. Default: off. */
  presenceEvents?: SlackPresenceEventsConfig;
  actions?: SlackActionConfig;
  slashCommand?: SlackSlashCommandConfig;
  dm?: SlackDmConfig;
  channels?: Record<string, SlackChannelConfig>;
  /** Reaction emoji added while processing a reply (e.g. "hourglass_flowing_sand"). Removed when done. Useful as a typing indicator fallback when assistant mode is not enabled. */
  typingReaction?: string;
};
type SlackConfig = {
  /** Optional per-account Slack configuration (multi-account). */
  accounts?: Record<string, SlackAccountConfig>;
  /** Optional default account id when multiple accounts are configured. */
  defaultAccount?: string;
} & SlackAccountConfig;
//#endregion
//#region src/config/types.telegram.d.ts
type TelegramActionConfig = {
  reactions?: boolean;
  sendMessage?: boolean;
  /** Enable poll creation. Requires sendMessage to also be enabled. */
  poll?: boolean;
  deleteMessage?: boolean;
  editMessage?: boolean;
  /** Enable sticker actions (send and search). */
  sticker?: boolean;
  /** Enable forum topic creation. */
  createForumTopic?: boolean;
  /** Enable forum topic editing (rename / change icon). */
  editForumTopic?: boolean;
};
type TelegramThreadBindingsConfig = SessionThreadBindingsConfig;
type TelegramNetworkConfig = {
  /** Override Node's autoSelectFamily behavior (true = enable, false = disable). */
  autoSelectFamily?: boolean;
  /**
   * DNS result order for network requests ("ipv4first" | "verbatim").
   * Set to "ipv4first" to prioritize IPv4 addresses and work around IPv6 issues.
   * Default: "ipv4first" on Node 22+ to avoid common fetch failures.
   */
  dnsResultOrder?: "ipv4first" | "verbatim";
  /**
   * Dangerous opt-in for Telegram media downloads in trusted fake-IP or
   * transparent-proxy environments that resolve api.telegram.org to
   * private/internal/special-use addresses.
   */
  dangerouslyAllowPrivateNetwork?: boolean;
};
type TelegramInlineButtonsScope = "off" | "dm" | "group" | "all" | "allowlist";
type TelegramPreviewStreamingConfig = Omit<ChannelPreviewStreamingConfig, "preview"> & {
  preview?: ChannelStreamingPreviewConfig;
};
type TelegramExecApprovalConfig = ChannelExecApprovalConfig;
type TelegramCapabilitiesConfig = string[] | {
  inlineButtons?: TelegramInlineButtonsScope;
};
/** Custom command definition for Telegram bot menu. */
type TelegramCustomCommand = {
  /** Command name (without leading /). */
  command: string;
  /** Description shown in Telegram command menu. */
  description: string;
};
type TelegramAccountConfig = CommonChannelMessagingConfig<TelegramCapabilitiesConfig, string | number, string | number, TelegramPreviewStreamingConfig> & ChannelReactionConfig<"off" | "own" | "all", "off" | "ack" | "minimal" | "extensive", string> & {
  /** Post a room-specific introduction when joining a group. Default: true. */
  joinIntro?: boolean;
  /** Telegram-native exec approval delivery + approver authorization. */
  execApprovals?: TelegramExecApprovalConfig;
  /** Override native command registration for Telegram (bool or "auto"). */
  commands?: ProviderCommandsConfig;
  /** Custom commands to register in Telegram's command menu (merged with native). */
  customCommands?: TelegramCustomCommand[];
  botToken?: SecretInput;
  /** Path to a regular file containing the bot token; symlinks are rejected. */
  tokenFile?: string;
  groups?: Record<string, TelegramGroupConfig>;
  /** Per-DM configuration for Telegram DM topics (key is chat ID). */
  direct?: Record<string, TelegramDirectConfig>;
  /**
   * Use Telegram Bot API 10.3 rich messages for text sends and edits.
   * When false (default), falls back to HTML/plain text formatting via sendMessage.
   * Set to true to enable native tables, details, and rich media via sendRichMessage.
   * Note: Some Telegram clients (Web, Desktop, older mobile) do NOT support
   * sendRichMessage and will show "This message is not supported" errors.
   * Default: false.
   */
  richMessages?: boolean;
  /** Network transport overrides for Telegram. */
  network?: TelegramNetworkConfig;
  proxy?: string;
  webhookUrl?: string;
  webhookSecret?: string;
  webhookPath?: string;
  /** Local webhook listener bind host (default: 127.0.0.1). */
  webhookHost?: string;
  /** Local webhook listener bind port (default: 8787). */
  webhookPort?: number;
  /** Path to the self-signed certificate (PEM) to upload to Telegram during webhook registration. */
  webhookCertPath?: string;
  /** Per-action tool gating (default: true for all). */
  actions?: TelegramActionConfig;
  /** Telegram thread/conversation binding overrides. */
  threadBindings?: TelegramThreadBindingsConfig;
  /**
   * Controls which user reactions trigger notifications:
   * - "off" (default): ignore all reactions
   * - "own": notify when users react to bot messages
   * - "all": notify agent of all reactions
   */
  /**
   * Controls agent's reaction capability:
   * - "off": agent cannot react
   * - "ack" (default): bot sends acknowledgment reactions (👀 while processing)
   * - "minimal": agent can react sparingly (guideline: 1 per 5-10 exchanges)
   * - "extensive": agent can react liberally when appropriate
   */
  /** Controls whether link previews are shown in outbound messages. Default: true. */
  linkPreview?: boolean;
  /** Send Telegram bot error replies silently (no notification sound). Default: false. */
  silentErrorReplies?: boolean;
  /** Controls outbound error reporting: always, once per cooldown window, or silent. */
  errorPolicy?: "always" | "once" | "silent";
  /**
   * Per-channel outbound response prefix override.
   *
   * Account values take precedence over the channel-level value.
   * Use `""` to explicitly disable a global prefix for this channel.
   * Use `"auto"` to derive `[{identity.name}]` from the routed agent.
   */
  /**
   * Per-channel ack reaction override.
   * Telegram expects unicode emoji (e.g., "👀") rather than shortcodes.
   */
  /** Custom Telegram Bot API root URL (e.g. "https://my-proxy.example.com" or a local Bot API server), not a /bot<TOKEN> endpoint. */
  apiRoot?: string;
  /** Trusted local filesystem roots for self-hosted Telegram Bot API absolute file_path values. */
  trustedLocalFileRoots?: string[];
  /** Auto-rename DM forum topics on first message using LLM. Default: true. */
  autoTopicLabel?: AutoTopicLabelConfig;
};
type TelegramTopicConfig = {
  requireMention?: boolean;
  /** Emit internal message hooks for mention-skipped topic messages. */
  ingest?: boolean;
  /** Per-topic override for group message policy (open|disabled|allowlist). */
  groupPolicy?: GroupPolicy;
  /** If specified, only load these skills for this topic. Omit = all skills; empty = no skills. */
  skills?: string[];
  /** If false, disable the bot for this topic. */
  enabled?: boolean;
  /** Optional allowlist for topic senders (numeric Telegram user IDs). */
  allowFrom?: Array<string | number>;
  /** Optional system prompt snippet for this topic. */
  systemPrompt?: string;
  /** If true, skip automatic voice-note transcription for mention detection in this topic. */
  disableAudioPreflight?: boolean;
  /** Route this topic to a specific agent (overrides group-level and binding routing). */
  agentId?: string;
  /** Controls outbound error reporting for this topic. */
  errorPolicy?: "always" | "once" | "silent";
};
type TelegramGroupConfig = {
  requireMention?: boolean;
  /** Emit internal message hooks for mention-skipped group messages. */
  ingest?: boolean;
  /** Per-group override for group message policy (open|disabled|allowlist). */
  groupPolicy?: GroupPolicy;
  /** Optional tool policy overrides for this group. */
  tools?: GroupToolPolicyConfig;
  toolsBySender?: GroupToolPolicyBySenderConfig;
  /** If specified, only load these skills for this group (when no topic). Omit = all skills; empty = no skills. */
  skills?: string[];
  /** Per-topic configuration (key is message_thread_id as string, or "*" for topic defaults). */
  topics?: Record<string, TelegramTopicConfig>;
  /** If false, disable the bot for this group (and its topics). */
  enabled?: boolean;
  /** Optional allowlist for group senders (numeric Telegram user IDs). */
  allowFrom?: Array<string | number>;
  /** Optional system prompt snippet for this group. */
  systemPrompt?: string;
  /** If true, skip automatic voice-note transcription for mention detection in this group. */
  disableAudioPreflight?: boolean;
  /** Controls outbound error reporting for this group. */
  errorPolicy?: "always" | "once" | "silent";
};
/** Config for LLM-based auto-topic labeling. */
type AutoTopicLabelConfig = boolean | {
  enabled?: boolean;
  /** Custom prompt for LLM-based topic naming. */
  prompt?: string;
};
type TelegramDirectConfig = {
  /** Per-DM override for DM message policy (open|disabled|allowlist). */
  dmPolicy?: DmPolicy;
  /** Optional tool policy overrides for this DM. */
  tools?: GroupToolPolicyConfig;
  toolsBySender?: GroupToolPolicyBySenderConfig;
  /** If specified, only load these skills for this DM (when no topic). Omit = all skills; empty = no skills. */
  skills?: string[];
  /** Per-topic configuration for DM topics (key is message_thread_id as string, or "*" for topic defaults). */
  topics?: Record<string, TelegramTopicConfig>;
  /** If false, disable the bot for this DM (and its topics). */
  enabled?: boolean;
  /** If true, require messages to be from a topic when topics are enabled. */
  requireTopic?: boolean;
  /** Optional allowlist for DM senders (numeric Telegram user IDs). */
  allowFrom?: Array<string | number>;
  /** Optional system prompt snippet for this DM. */
  systemPrompt?: string;
  /** Controls outbound error reporting for this DM. */
  errorPolicy?: "always" | "once" | "silent";
  /** Auto-rename DM forum topics on first message using LLM. Default: true. */
  autoTopicLabel?: AutoTopicLabelConfig;
};
type TelegramConfig = {
  /** Optional per-account Telegram configuration (multi-account). */
  accounts?: Record<string, TelegramAccountConfig>;
  /** Optional default account id when multiple accounts are configured. */
  defaultAccount?: string;
} & TelegramAccountConfig;
//#endregion
//#region src/utils/reaction-level.d.ts
/**
 * Shared reaction-level resolver for channel plugins that expose ACK and agent reaction controls.
 * Channel adapters supply defaults/fallbacks; this helper owns the common flag expansion.
 */
/** User-configurable reaction behavior level for channel delivery. */
type ReactionLevel = "off" | "ack" | "minimal" | "extensive";
/** Expanded reaction flags consumed by runtime delivery and prompt guidance. */
type ResolvedReactionLevel = {
  level: ReactionLevel;
  /** Whether ACK reactions (e.g., 👀 when processing) are enabled. */
  ackEnabled: boolean;
  /** Whether agent-controlled reactions are enabled. */
  agentReactionsEnabled: boolean;
  /** Guidance level for agent reactions (minimal = sparse, extensive = liberal). */
  agentReactionGuidance?: "minimal" | "extensive";
};
/** Resolves raw reaction config into ACK and agent-reaction runtime flags. */
declare function resolveReactionLevel(params: {
  value: unknown;
  defaultLevel: ReactionLevel;
  invalidFallback: "ack" | "minimal";
}): ResolvedReactionLevel;
//#endregion
//#region src/config/types.whatsapp.d.ts
type WhatsAppActionConfig = {
  reactions?: boolean;
  sendMessage?: boolean;
  polls?: boolean;
  /** Enable the experimental requester-bound voice-call tool. Default: false. */
  calls?: boolean;
};
type WhatsAppReactionLevel = ReactionLevel;
type WhatsAppGroupConfig = {
  requireMention?: boolean;
  tools?: GroupToolPolicyConfig;
  toolsBySender?: GroupToolPolicyBySenderConfig;
  /** Optional system prompt for this group. */
  systemPrompt?: string;
};
type WhatsAppDirectConfig = {
  /** Optional system prompt for this direct chat. */
  systemPrompt?: string;
};
type WhatsAppAckReactionConfig = {
  /** Emoji to use for acknowledgment (e.g., "👀"). Empty = disabled. */
  emoji?: string;
  /** Send reactions in direct chats. Default: true. */
  direct?: boolean;
  /**
   * Send reactions in group chats:
   * - "always": react to all group messages
   * - "mentions": react only when bot is mentioned
   * - "never": never react in groups
   * Default: "mentions"
   */
  group?: "always" | "mentions" | "never";
};
type WhatsAppSharedConfig = CommonChannelMessagingConfig<string[], string> & ChannelReadReceiptConfig & ChannelReactionConfig<never, WhatsAppReactionLevel, WhatsAppAckReactionConfig> & {
  /** Same-phone setup (bot uses your personal WhatsApp number). */
  selfChatMode?: boolean;
  groups?: Record<string, WhatsAppGroupConfig>;
  /** Per-direct-chat prompt overrides keyed by user ID or `*` wildcard. */
  direct?: Record<string, WhatsAppDirectConfig>;
};
type WhatsAppSpecificConfig = {
  /** @deprecated Doctor-only legacy input. */
  messagePrefix?: string;
};
type WhatsAppConfig = Omit<WhatsAppSharedConfig, "name"> & WhatsAppSpecificConfig & {
  /** Optional per-account WhatsApp configuration (multi-account). */
  accounts?: Record<string, WhatsAppAccountConfig>;
  /** Optional default account id when multiple accounts are configured. */
  defaultAccount?: string;
  /** Per-action tool gating. Calls default to false; existing actions default to true. */
  actions?: WhatsAppActionConfig;
  /** Plugin hook opt-in configuration for privacy-sensitive inbound events. */
  pluginHooks?: {
    /** Enable message_received hooks to broadcast inbound WhatsApp messages to plugins. */
    messageReceived?: boolean;
  };
};
type WhatsAppAccountConfig = WhatsAppSpecificConfig & WhatsAppSharedConfig & {
  /** Optional display name for this account (used in CLI/UI lists). */
  name?: string;
  /** Override auth directory (Baileys multi-file auth state). */
  authDir?: string;
  /** Plugin hook opt-in configuration for privacy-sensitive inbound events. */
  pluginHooks?: {
    /** Enable message_received hooks to broadcast inbound WhatsApp messages to plugins. */
    messageReceived?: boolean;
  };
};
//#endregion
//#region src/config/types.channels.d.ts
type ChannelDefaultsConfig = {
  /** @deprecated Doctor-only legacy input. */
  heartbeat?: ChannelHeartbeatVisibilityConfig;
  /** Default group-chat admission policy inherited by channels that support groups. */
  groupPolicy?: GroupPolicy;
  /** Default history/context visibility inherited by channel configs. */
  contextVisibility?: ContextVisibilityMode;
  /** Default heartbeat visibility for all channels. */
  heartbeatVisibility?: ChannelHeartbeatVisibilityConfig;
  /** Default pair loop guard settings for channels that support bot loop protection. */
  botLoopProtection?: ChannelBotLoopProtectionConfig;
  /** Default implicit-mention policy inherited by supporting channels. */
  implicitMentions?: ChannelImplicitMentionsConfig;
};
/** Provider/channel/target model override map used by channel dispatch. Keys are channel-specific group IDs, thread IDs, channel names, or DM peer identifiers (see docs/gateway/config-channels.md). */
type ChannelModelByChannelConfig = Record<string, Record<string, string>>;
/** JSON-compatible open-world channel section for plugin ids unknown to core. */
type OpenWorldChannelConfig = ReturnType<typeof JSON.parse>;
interface ChannelsConfig {
  /** Shared defaults inherited by channel sections unless they override them. */
  defaults?: ChannelDefaultsConfig;
  /** Map provider -> channel id / DM peer id -> model override. See docs/gateway/config-channels.md for supported key forms. */
  modelByChannel?: ChannelModelByChannelConfig;
  discord?: DiscordConfig;
  googlechat?: GoogleChatConfig;
  imessage?: IMessageConfig;
  irc?: IrcConfig;
  msteams?: MSTeamsConfig;
  signal?: SignalConfig;
  slack?: SlackConfig;
  telegram?: TelegramConfig;
  whatsapp?: WhatsAppConfig;
  /**
   * Channel sections are plugin-owned and keyed by arbitrary channel ids.
   * Open-world config keeps SDK/plugin-owned sections ergonomic for dynamic ids.
   */
  [key: string]: OpenWorldChannelConfig;
}
//#endregion
export { normalizeChatType as $, DiscordExecApprovalConfig as A, TtsPersonaConfig as B, ChannelImplicitMentionsConfig as C, ConfigUiGroup as Ct, DiscordActionConfig as D, DiscordAccountConfig as E, ResolvedTtsPersona as F, GroupToolPolicyConfig as G, TtsProvider as H, TtsAutoMode as I, ToolsConfig as J, ToolLoopDetectionConfig as K, TtsConfig as L, DiscordGuildEntry as M, DiscordIntentsConfig as N, DiscordAutoPresenceConfig as O, DiscordSlashCommandConfig as P, ChatType as Q, TtsMode as R, MSTeamsTeamConfig as S, JsonSchemaObject as St, GoogleChatConfig as T, AgentToolsConfig as U, TtsPersonaFallbackPolicy as V, GroupToolPolicyBySenderConfig as W, SafeBinProfile as X, ConfiguredModelProviderRequest as Y, SafeBinProfileFixture as Z, SignalReactionNotificationMode as _, HeartbeatSchema as _t, TelegramAccountConfig as a, BroadcastStrategy as at, MSTeamsConfig as b, ChannelConfigSchema as bt, TelegramExecApprovalConfig as c, GroupChatConfig as ct, TelegramNetworkConfig as d, MessagesConfig as dt, ApprovalsConfig as et, TelegramTopicConfig as f, NativeCommandsSetting as ft, SlackSlashCommandConfig as g, AgentContextLimitsSchema as gt, SlackReactionNotificationMode as h, MemorySearchConfig as ht, resolveReactionLevel as i, BroadcastConfig as it, DiscordGuildChannelConfig as j, DiscordConfig as k, TelegramGroupConfig as l, MentionPatternsMode as lt, SlackChannelConfig as m, MemoryConfig as mt, ReactionLevel as n, ExecApprovalForwardingMode as nt, TelegramActionConfig as o, CommandsConfig as ot, SlackAccountConfig as p, MemoryCitationsMode as pt, ToolProfileId as q, ResolvedReactionLevel as r, ChannelBotLoopProtectionConfig as rt, TelegramDirectConfig as s, DmConfig as st, ChannelsConfig as t, ExecApprovalForwardTarget as tt, TelegramInlineButtonsScope as u, MentionPatternsPolicyConfig as ut, MSTeamsChannelConfig as v, ToolPolicySchema as vt, GoogleChatAccountConfig as w, ConfigUiPresentation as wt, MSTeamsReplyStyle as x, ChannelConfigUiHint as xt, MSTeamsCloudName as y, ChannelConfigRuntimeSchema as yt, TtsModelOverrideConfig as z };