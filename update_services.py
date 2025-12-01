import re

with open('app/(layout)/service/page.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Update marketing section
content = content.replace('title: "Digital Marketing Strategy"', 'title: "Digital Marketing & Ads"')
content = content.replace('subtitle: "Growth Arrows, Spark Trails, and Dynamic Analytics Bars."', 'subtitle: "Every Rupee Invested Should Come Back With Friends."')

# Update marketing copy
old_marketing = 'Precision campaigns across paid media, social channels, and email automation. Our approach is data-driven, focusing only on verifiable ROI and audience segmentation for hyper-targeted engagement.'
new_marketing = "We don't burn your ad budget on 'brand awareness'. Every rupee comes back with friends. Google Ads, Meta Ads, LinkedIn, YouTube - we speak their language fluently. Our data-driven campaigns focus on verifiable ROI, not vanity metrics."
content = content.replace(old_marketing, new_marketing)

# Update marketing deliverables
content = content.replace('"Full Media Buying Strategy"', '"Google Ads Management"')
content = content.replace('"A/B Test Funnel Setup"', '"Facebook/Instagram Ads"')
content = content.replace('"Proprietary Analytics Dashboard"', '"LinkedIn & YouTube Ads"')
content = content.replace('"Monthly Performance Forecasts"', '"Retargeting Campaigns"')

# Update marketing trust
content = content.replace('Managed $50M+ in ad spend with an average 4x ROAS.', 'Managed Rs50Cr+ in ad spend with average 4x ROAS.')

# Update GMB section
content = content.replace('title: "Google My Business Mastery"', 'title: "Google My Business & Local SEO"')
content = content.replace('subtitle: "Glowing Map, Local Highlight Pulses, and Trust Badges."', 'subtitle: "Dominate Your Neighborhood - Then the City."')

# Update GMB copy
old_gmb = 'Dominate local search. We optimize your GMB profile for maximum local visibility, managing reviews, posts, and accurate data to ensure your business is the immediate, trusted choice in your service area.'
new_gmb = "When someone searches 'best [your service] near me', you should be the first name they see. We optimize your GMB profile for maximum local visibility, manage reviews, and ensure your business is THE trusted choice in your area. From Ranchi to Mumbai, we make you the local legend."
content = content.replace(old_gmb, new_gmb)

# Update GMB deliverables
content = content.replace('"Geo-Targeted Content"', '"GMB Profile Optimization"')
content = content.replace('"Review Generation Strategy"', '"Review Generation & Management"')
content = content.replace('"Local Citation Cleanup"', '"Local Citation Building"')
content = content.replace('"GMB Posting Schedule"', '"Reputation Management"')

with open('app/(layout)/service/page.tsx', 'w', encoding='utf-8') as f:
    f.write(content)

print('Done updating services!')

