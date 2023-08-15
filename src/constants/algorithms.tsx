// key is algorithm name shown in UI, value is description shown in title attribute
export const algorithms: Record<Algorithm, string> = {
  'xor-c': 'xor based colored encryption algorithm'
  // 'xor-bw': 'xor based black and white encryption algorithm',
}

export type Algorithm = 'xor-c'

