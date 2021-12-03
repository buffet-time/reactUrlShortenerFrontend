/* eslint-disable no-undef */
import { getLink, createLink } from './App'

test('Create a Link and check to see if we can get it back from the API', async () => {
	const url = 'https://google.com/'
	const slug = 'google'

	await createLink(url, slug)
	const createdLink = await getLink(slug)

	expect(createdLink.url).toBe(url)
})
