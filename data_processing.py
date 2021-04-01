import pandas as pd

df = pd.read_csv('data/video_games.csv')
df['top_ten_names'] = df.sort_values('Global_Sales', ascending=False).head(10)['Name']
df['top_ten_sales'] = df.sort_values('Global_Sales', ascending=False).head(10)['Global_Sales']
print(df['top_ten_sales'])
df['top_genre_NA'] = df.groupby("Genre")["NA_Sales"].sum().idxmax()
df['top_genre_EU'] = df.groupby("Genre")["EU_Sales"].sum().idxmax()
df['top_genre_JP'] = df.groupby("Genre")["JP_Sales"].sum().idxmax()
df['top_genre_other'] = df.groupby("Genre")["Other_Sales"].sum().idxmax()
df['sports_publishers'] = df.loc[df['Genre'] == 'Sports'].groupby("Publisher")["Global_Sales"].sum().reset_index()['Publisher']
df['sports_sales'] = df.loc[df['Genre'] == 'Sports'].groupby("Publisher")["Global_Sales"].sum().reset_index()['Global_Sales']
df['platform_publishers'] = df.loc[df['Genre'] == 'Platform'].groupby("Publisher")["Global_Sales"].sum().reset_index()['Publisher']
df['platform_sales'] = df.loc[df['Genre'] == 'Platform'].groupby("Publisher")["Global_Sales"].sum().reset_index()['Global_Sales']
df['racing_publishers'] = df.loc[df['Genre'] == 'Racing'].groupby("Publisher")["Global_Sales"].sum().reset_index()['Publisher']
df['racing_sales'] = df.loc[df['Genre'] == 'Racing'].groupby("Publisher")["Global_Sales"].sum().reset_index()['Global_Sales']
df['role_playing_publishers'] = df.loc[df['Genre'] == 'Role-Playing'].groupby("Publisher")["Global_Sales"].sum().reset_index()['Publisher']
df['role_playing_sales'] = df.loc[df['Genre'] == 'Role-Playing'].groupby("Publisher")["Global_Sales"].sum().reset_index()['Global_Sales']
df['puzzle_publishers'] = df.loc[df['Genre'] == 'Puzzle'].groupby("Publisher")["Global_Sales"].sum().reset_index()['Publisher']
df['puzzle_sales'] = df.loc[df['Genre'] == 'Puzzle'].groupby("Publisher")["Global_Sales"].sum().reset_index()['Global_Sales']
df['misc_publishers'] = df.loc[df['Genre'] == 'Misc'].groupby("Publisher")["Global_Sales"].sum().reset_index()['Publisher']
df['misc_sales'] = df.loc[df['Genre'] == 'Misc'].groupby("Publisher")["Global_Sales"].sum().reset_index()['Global_Sales']
df['shooter_publishers'] = df.loc[df['Genre'] == 'Shooter'].groupby("Publisher")["Global_Sales"].sum().reset_index()['Publisher']
df['shooter_sales'] = df.loc[df['Genre'] == 'Shooter'].groupby("Publisher")["Global_Sales"].sum().reset_index()['Global_Sales']
df['simulation_publishers'] = df.loc[df['Genre'] == 'Simulation'].groupby("Publisher")["Global_Sales"].sum().reset_index()['Publisher']
df['simulation_sales'] = df.loc[df['Genre'] == 'Simulation'].groupby("Publisher")["Global_Sales"].sum().reset_index()['Global_Sales']
df['action_publishers'] = df.loc[df['Genre'] == 'Action'].groupby("Publisher")["Global_Sales"].sum().reset_index()['Publisher']
df['action_sales'] = df.loc[df['Genre'] == 'Action'].groupby("Publisher")["Global_Sales"].sum().reset_index()['Global_Sales']
df['fighting_publishers'] = df.loc[df['Genre'] == 'Fighting'].groupby("Publisher")["Global_Sales"].sum().reset_index()['Publisher']
df['fighting_sales'] = df.loc[df['Genre'] == 'Fighting'].groupby("Publisher")["Global_Sales"].sum().reset_index()['Global_Sales']
df['adventure_publishers'] = df.loc[df['Genre'] == 'Adventure'].groupby("Publisher")["Global_Sales"].sum().reset_index()['Publisher']
df['adventure_sales'] = df.loc[df['Genre'] == 'Adventure'].groupby("Publisher")["Global_Sales"].sum().reset_index()['Global_Sales']
df['strategy_publishers'] = df.loc[df['Genre'] == 'Strategy'].groupby("Publisher")["Global_Sales"].sum().reset_index()['Publisher']
df['strategy_sales'] = df.loc[df['Genre'] == 'Strategy'].groupby("Publisher")["Global_Sales"].sum().reset_index()['Global_Sales']
# df.to_csv('data/new_video_games.csv')


