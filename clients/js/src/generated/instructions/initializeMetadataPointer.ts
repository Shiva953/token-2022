/**
 * This code was AUTOGENERATED using the codama library.
 * Please DO NOT EDIT THIS FILE, instead use visitors
 * to add features, then rerun codama to update it.
 *
 * @see https://github.com/codama-idl/codama
 */

import {
  combineCodec,
  getAddressDecoder,
  getAddressEncoder,
  getOptionDecoder,
  getOptionEncoder,
  getStructDecoder,
  getStructEncoder,
  getU8Decoder,
  getU8Encoder,
  transformEncoder,
  type Address,
  type Codec,
  type Decoder,
  type Encoder,
  type IAccountMeta,
  type IInstruction,
  type IInstructionWithAccounts,
  type IInstructionWithData,
  type Option,
  type OptionOrNullable,
  type WritableAccount,
} from '@solana/web3.js';
import { TOKEN_2022_PROGRAM_ADDRESS } from '../programs';
import { getAccountMetaFactory, type ResolvedAccount } from '../shared';

export const INITIALIZE_METADATA_POINTER_DISCRIMINATOR = 39;

export function getInitializeMetadataPointerDiscriminatorBytes() {
  return getU8Encoder().encode(INITIALIZE_METADATA_POINTER_DISCRIMINATOR);
}

export const INITIALIZE_METADATA_POINTER_METADATA_POINTER_DISCRIMINATOR = 0;

export function getInitializeMetadataPointerMetadataPointerDiscriminatorBytes() {
  return getU8Encoder().encode(
    INITIALIZE_METADATA_POINTER_METADATA_POINTER_DISCRIMINATOR
  );
}

export type InitializeMetadataPointerInstruction<
  TProgram extends string = typeof TOKEN_2022_PROGRAM_ADDRESS,
  TAccountMint extends string | IAccountMeta<string> = string,
  TRemainingAccounts extends readonly IAccountMeta<string>[] = [],
> = IInstruction<TProgram> &
  IInstructionWithData<Uint8Array> &
  IInstructionWithAccounts<
    [
      TAccountMint extends string
        ? WritableAccount<TAccountMint>
        : TAccountMint,
      ...TRemainingAccounts,
    ]
  >;

export type InitializeMetadataPointerInstructionData = {
  discriminator: number;
  metadataPointerDiscriminator: number;
  /** The public key for the account that can update the metadata address. */
  authority: Option<Address>;
  /** The account address that holds the metadata. */
  metadataAddress: Option<Address>;
};

export type InitializeMetadataPointerInstructionDataArgs = {
  /** The public key for the account that can update the metadata address. */
  authority: OptionOrNullable<Address>;
  /** The account address that holds the metadata. */
  metadataAddress: OptionOrNullable<Address>;
};

export function getInitializeMetadataPointerInstructionDataEncoder(): Encoder<InitializeMetadataPointerInstructionDataArgs> {
  return transformEncoder(
    getStructEncoder([
      ['discriminator', getU8Encoder()],
      ['metadataPointerDiscriminator', getU8Encoder()],
      [
        'authority',
        getOptionEncoder(getAddressEncoder(), {
          prefix: null,
          noneValue: 'zeroes',
        }),
      ],
      [
        'metadataAddress',
        getOptionEncoder(getAddressEncoder(), {
          prefix: null,
          noneValue: 'zeroes',
        }),
      ],
    ]),
    (value) => ({
      ...value,
      discriminator: INITIALIZE_METADATA_POINTER_DISCRIMINATOR,
      metadataPointerDiscriminator:
        INITIALIZE_METADATA_POINTER_METADATA_POINTER_DISCRIMINATOR,
    })
  );
}

export function getInitializeMetadataPointerInstructionDataDecoder(): Decoder<InitializeMetadataPointerInstructionData> {
  return getStructDecoder([
    ['discriminator', getU8Decoder()],
    ['metadataPointerDiscriminator', getU8Decoder()],
    [
      'authority',
      getOptionDecoder(getAddressDecoder(), {
        prefix: null,
        noneValue: 'zeroes',
      }),
    ],
    [
      'metadataAddress',
      getOptionDecoder(getAddressDecoder(), {
        prefix: null,
        noneValue: 'zeroes',
      }),
    ],
  ]);
}

export function getInitializeMetadataPointerInstructionDataCodec(): Codec<
  InitializeMetadataPointerInstructionDataArgs,
  InitializeMetadataPointerInstructionData
> {
  return combineCodec(
    getInitializeMetadataPointerInstructionDataEncoder(),
    getInitializeMetadataPointerInstructionDataDecoder()
  );
}

export type InitializeMetadataPointerInput<
  TAccountMint extends string = string,
> = {
  /** The mint to initialize. */
  mint: Address<TAccountMint>;
  authority: InitializeMetadataPointerInstructionDataArgs['authority'];
  metadataAddress: InitializeMetadataPointerInstructionDataArgs['metadataAddress'];
};

export function getInitializeMetadataPointerInstruction<
  TAccountMint extends string,
  TProgramAddress extends Address = typeof TOKEN_2022_PROGRAM_ADDRESS,
>(
  input: InitializeMetadataPointerInput<TAccountMint>,
  config?: { programAddress?: TProgramAddress }
): InitializeMetadataPointerInstruction<TProgramAddress, TAccountMint> {
  // Program address.
  const programAddress = config?.programAddress ?? TOKEN_2022_PROGRAM_ADDRESS;

  // Original accounts.
  const originalAccounts = {
    mint: { value: input.mint ?? null, isWritable: true },
  };
  const accounts = originalAccounts as Record<
    keyof typeof originalAccounts,
    ResolvedAccount
  >;

  // Original args.
  const args = { ...input };

  const getAccountMeta = getAccountMetaFactory(programAddress, 'programId');
  const instruction = {
    accounts: [getAccountMeta(accounts.mint)],
    programAddress,
    data: getInitializeMetadataPointerInstructionDataEncoder().encode(
      args as InitializeMetadataPointerInstructionDataArgs
    ),
  } as InitializeMetadataPointerInstruction<TProgramAddress, TAccountMint>;

  return instruction;
}

export type ParsedInitializeMetadataPointerInstruction<
  TProgram extends string = typeof TOKEN_2022_PROGRAM_ADDRESS,
  TAccountMetas extends readonly IAccountMeta[] = readonly IAccountMeta[],
> = {
  programAddress: Address<TProgram>;
  accounts: {
    /** The mint to initialize. */
    mint: TAccountMetas[0];
  };
  data: InitializeMetadataPointerInstructionData;
};

export function parseInitializeMetadataPointerInstruction<
  TProgram extends string,
  TAccountMetas extends readonly IAccountMeta[],
>(
  instruction: IInstruction<TProgram> &
    IInstructionWithAccounts<TAccountMetas> &
    IInstructionWithData<Uint8Array>
): ParsedInitializeMetadataPointerInstruction<TProgram, TAccountMetas> {
  if (instruction.accounts.length < 1) {
    // TODO: Coded error.
    throw new Error('Not enough accounts');
  }
  let accountIndex = 0;
  const getNextAccount = () => {
    const accountMeta = instruction.accounts![accountIndex]!;
    accountIndex += 1;
    return accountMeta;
  };
  return {
    programAddress: instruction.programAddress,
    accounts: {
      mint: getNextAccount(),
    },
    data: getInitializeMetadataPointerInstructionDataDecoder().decode(
      instruction.data
    ),
  };
}
