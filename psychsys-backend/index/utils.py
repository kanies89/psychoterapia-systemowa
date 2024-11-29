import requests

def fetch_instagram_embed(post_url, access_token):
    """
    Fetch the embed HTML for an Instagram post using the Instagram oEmbed API.

    Args:
        post_url (str): The URL of the Instagram post.
        access_token (str): The access token for the Instagram oEmbed API.

    Returns:
        str: The embed HTML if successful, None otherwise.
    """
    api_url = f"https://graph.facebook.com/v21.0/instagram_oembed"
    params = {
        "url": post_url,
        "access_token": access_token,
    }

    try:
        response = requests.get(api_url, params=params)
        response.raise_for_status()  # Raise an HTTPError for bad responses
        data = response.json()
        return data.get("html")  # Return the embed HTML
    except requests.RequestException as e:
        # Log the error if needed
        print(f"Error fetching Instagram embed: {e}")
        return None
