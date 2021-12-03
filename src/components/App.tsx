/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { useEffect, useState } from 'react'
import { Button, OverlayTrigger, Table, Tooltip } from 'react-bootstrap'
import { key } from '../../apiKey'
import './App.css'

interface ShortenedUrlResponseObject {
	short_url: string
	slug: string
	url: string
}

const apiUrl = 'https://api.bely.me/links'
const headers = {
	headers: {
		'GB-Access-Token': key
	}
}

function App() {
	const [urlToShorten, setUrlToShorten] = useState(''),
		[optionalSlug, setOptionalSlug] = useState(''),
		[useSlug, setUseSlug] = useState(false),
		[previousUrls, setPreviousUrls] = useState(
			[] as ShortenedUrlResponseObject[]
		)

	const updatePreviousLinks = async () => setPreviousUrls((await getLink())!)

	// ran once on mount
	useEffect(() => {
		updatePreviousLinks()
	}, [])

	return (
		<div className="App">
			<div className="link-shortener">
				<div>
					<div className="input-group mb-3">
						<label>Url to shorten: </label>
						<div className="input-group-text">
							<OverlayTrigger
								key="top"
								placement="top"
								overlay={<Tooltip id={`tooltip`}>Use a custom slug?</Tooltip>}
							>
								<input
									className="form-check-input mt-0"
									type="checkbox"
									onInput={() => {
										setUseSlug(!useSlug)
										setOptionalSlug('')
									}}
									id="useSlug"
									data-bs-toggle="tooltip"
									data-bs-placement="top"
									title="Tooltip on top"
								/>
							</OverlayTrigger>
						</div>{' '}
						<input
							type="text"
							className="form-control"
							value={urlToShorten}
							onInput={(e) => setUrlToShorten((e.target as any).value)}
						/>
					</div>
				</div>
				{useSlug && (
					<div>
						<label>Optional Url Slug: </label>
						<input
							type="text"
							className={`form-control optional-url-input`}
							value={optionalSlug}
							onInput={(e) => setOptionalSlug((e.target as any).value)}
						/>
					</div>
				)}
				<Button
					variant="primary"
					className="create-button"
					onClick={async () => {
						await createLink(
							urlToShorten,
							optionalSlug ? optionalSlug : undefined
						)
						updatePreviousLinks()
					}}
				>
					Shorten URL
				</Button>{' '}
			</div>

			<div className="previous-links">
				<Table striped bordered hover variant="dark">
					<thead>
						<tr>
							<th>All URLs Shortened</th>
						</tr>
					</thead>
					<tbody>
						{previousUrls.map((value) => {
							return (
								<tr key={value.slug}>
									<td className="previous-url">
										{value.short_url}
										<div
											className="close-div"
											onClick={async () => {
												await deleteLink(value.slug)
												updatePreviousLinks()
											}}
										>
											x
										</div>
									</td>
								</tr>
							)
						})}
					</tbody>
				</Table>
			</div>
		</div>
	)
}

export async function getLink(slug?: string) {
	try {
		return (await (
			await fetch(slug ? `${apiUrl}/${slug}` : apiUrl, headers)
		).json()) as ShortenedUrlResponseObject[]
	} catch (error) {
		console.error(`Error ${error}`)
	}
}

export async function createLink(urlToShorten: string, slug?: string) {
	try {
		await fetch(apiUrl, {
			method: 'POST',
			headers: {
				...headers.headers,
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ url: urlToShorten, slug: slug ? slug : null })
		})
	} catch (error) {
		console.error(`Error in createLink(): ${error}`)
	}
}

export async function deleteLink(slug: string) {
	try {
		await fetch(`${apiUrl}/${slug}`, {
			method: 'DELETE',
			...headers
		})
	} catch (error) {
		console.error(`Error in createLink(): ${error}`)
	}
}

export default App
