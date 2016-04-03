# Plugins API

# `app.createPlugin(options)`

#### string `name`

The name of the plugin

#### string `desc`

A description or the plugin

#### function `search`

The search callback function.

| Callback Parameter | Type | Description |
| :--- | :--- | :--- |
| `q` | string | The search query |

#### function `execute`

The execution callback function.

| Callback Parameter | Type | Description |
| :--- | :--- | :--- |
| `result` | Result | The result object |

## Result

#### string `icon`

#### string `title`

#### string `subtitle`

#### string `desc`

#### int `score`
