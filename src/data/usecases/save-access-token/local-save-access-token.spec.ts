import { LocalSaveAccessToken } from './local-save-access-token'
import { SetStorage } from '@/data/protocols/storage/set-storage'
import { stubSetStorage } from '@/data/test/stub-local-storage'
import faker from 'faker'

type SutTypes = {
  sut: LocalSaveAccessToken
  setStorageStub: SetStorage
}

const makeSut = (): SutTypes => {
  const setStorageStub = stubSetStorage()
  const sut = new LocalSaveAccessToken(setStorageStub)
  return {
    sut,
    setStorageStub
  }
}

describe('LocalSaveAccessToken', () => {
  it('should call SetStorage with correct values', async () => {
    const { sut, setStorageStub } = makeSut()
    const setSpy = jest.spyOn(setStorageStub, 'set')
    const accessToken = faker.random.uuid()
    await sut.save(accessToken)
    expect(setSpy).toBeCalledWith('accessToken', accessToken)
  })
})
