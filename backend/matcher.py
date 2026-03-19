import sys
sys.path.append('.')
from github_api import get_user_repos, search_good_first_issues

def run_matching_pipeline(username):
	# Fetch user repos
	repos = get_user_repos(username)
	if not repos:
		print("No repos found for user.")
		return []

	# Extract top languages from repos
	languages = [repo['language'] for repo in repos if repo['language']]
	top_languages = list(set(languages))
	profile = {'top_languages': top_languages}

	# Search issues for each language
	all_issues = []
	for lang in top_languages:
		issues = search_good_first_issues(lang)
		# Add repo stars info if possible
		for issue in issues:
			repo = next((r for r in repos if r['name'] == issue['repo_name']), None)
			issue['repo_stars'] = repo['stars'] if repo else 0
			issue['labels'] = ['good first issue']  # Assume label for demo
		all_issues.extend(issues)

	# Match and rank issues
	matches = match_issues(profile, all_issues)
	return matches

def match_issues(profile, issues):
	"""
	Matches issues to a user profile.
	Args:
		profile (dict): User profile data.
		issues (list): List of issues to match.
	Returns:
		list: Ranked list of matched issues.
	"""
	# Score each issue
	scored_issues = []
	for issue in issues:
		issue_score = score_issue(issue, profile)
		issue_copy = issue.copy()
		issue_copy['score'] = issue_score
		scored_issues.append(issue_copy)

	# Sort by score descending
	scored_issues.sort(key=lambda x: x['score'], reverse=True)

	# Return top 10 matches
	return scored_issues[:10]

def score_issue(issue, profile):
	"""
	Scores an issue based on profile.
	Args:
		issue (dict): Issue data.
		profile (dict): User profile data.
	Returns:
		float: Score for the issue.
	"""
	# Scoring rules:
	# 1. Language match
	# 2. Good first issue label
	# 3. Repo popularity (stars)
	score = 0

	# 1. Language match
	if issue.get('language') in profile.get('top_languages', []):
		score += 3

	# 2. Good first issue label
	if 'good first issue' in issue.get('labels', []):
		score += 2

	# 3. Repo popularity
	stars = issue.get('repo_stars', 0)
	if stars >= 100:
		score += 2
	elif stars >= 50:
		score += 1

	return score

if __name__ == "__main__":
	# Run pipeline for a real GitHub username
	username = input("Enter GitHub username: ")
	matches = run_matching_pipeline(username)
	for m in matches:
		print(f"{m['repo_name']} | {m['issue_title']} | Score: {m['score']} | URL: {m['issue_url']}")
