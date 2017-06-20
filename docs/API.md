# API
[Back](/)

## JSON Response
```ruby
data: Object
  error: Object
    message: String
  query: String
  from: String ['cn', 'jp']
  to: String ['cn', 'jp']
  explains: Array
    primary: String
    secondary: String
    tertiary: String
    brief: String
    mp3: String(URL)
    $item: Object
      part_of_speech: String
      items: Array
        $item: Object
          type: String ['text', 'list']
          text: String
          cn: String
          jp: String
```
