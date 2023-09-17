"""YouTube Player plugin.

| Copyright 2017-2023, Voxel51, Inc.
| `voxel51.com <https://voxel51.com/>`_
|
"""

import fiftyone.operators as foo
import fiftyone.operators.types as types


class OpenYouTubePanel(foo.Operator):
    @property
    def config(self):
        _config = foo.OperatorConfig(
            name="open_youtube_player_panel",
            label="Open Youtube Player Panel",
            unlisted=False,
        )
        _config.icon = "/assets/youtube.svg"
        return _config

    def resolve_placement(self, ctx):
        return types.Placement(
            types.Places.SAMPLES_GRID_SECONDARY_ACTIONS,
            types.Button(
                label="Open YouTube Player Panel",
                prompt=False,
                icon="/assets/youtube.svg",
            ),
        )

    def execute(self, ctx):
        ctx.trigger(
            "open_panel",
            params=dict(
                name="YouTubePlayerPanel", isActive=True, layout="horizontal"
            ),
        )


def register(p):
    p.register(OpenYouTubePanel)
