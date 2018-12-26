using System;
using Newtonsoft.Json;

namespace ChecklistDojo.Data.Models
{
    public class Error
    {
        [JsonIgnore] // Prevent the actual exception from being disclosed
        public Exception Exception { get; set; }

        public ErrorCode ErrorCode { get; set; } = ErrorCode.ServerError;

        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public string Message { get; set; }
    }
}
